from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import datetime
import pandas as pd
from supabase import create_client, Client
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import os
from dotenv import load_dotenv


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase URL or Key is missing. Check your .env file.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

mental_health_model = joblib.load("mental_health.pkl")
physical_injury_model = joblib.load("physical_injury_model.pkl")

numeric_features = [
    "Pain Level (0-10)", "Mobility Score", "Fatigue Level (1-5)",
    "Adherence to Recommendations (%)", "Daily Activity Levels",
    "Sleep Quality (1-10)", "Dietary Habits (1-5)"
]
categorical_features = [
    "Gender", "Marital Status", "Education Level (Adults 20+)",
    "Household Reference Person Gender"
]

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])
categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])
preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

app = FastAPI()

class UserInput(BaseModel):
    pain_level: float
    mobility_score: float
    fatigue_level: float
    adherence_to_recommendations: float
    daily_activity_levels: float
    sleep_quality: float
    dietary_habits: float


class PredictionResponse(BaseModel):
    mental_health_symptom_severity: float
    physical_injury_recovery_milestones: float
    prediction_date: str  # local date (YYYY-MM-DD)
    prediction_time: str  # local time (HH:MM:SS)

@app.post("/predict", response_model=PredictionResponse)
async def predict(input_data: UserInput):
    
    user_input_dict = {
        "Pain Level (0-10)": [input_data.pain_level],
        "Mobility Score": [input_data.mobility_score],
        "Fatigue Level (1-5)": [input_data.fatigue_level],
        "Adherence to Recommendations (%)": [input_data.adherence_to_recommendations],
        "Daily Activity Levels": [input_data.daily_activity_levels],
        "Sleep Quality (1-10)": [input_data.sleep_quality],
        "Dietary Habits (1-5)": [input_data.dietary_habits]
    }
    
    default_categorical_values = {
        "Gender": ["M"],
        "Marital Status": [1],
        "Education Level (Adults 20+)": [3],
        "Household Reference Person Gender": [2]
    }
    user_input_dict.update(default_categorical_values)

   
    user_input_df = pd.DataFrame(user_input_dict)

  
    user_input_processed = preprocessor.fit_transform(user_input_df)
    processed_feature_names = preprocessor.get_feature_names_out()
    user_input_processed_df = pd.DataFrame(user_input_processed, columns=processed_feature_names)

    
    mh_expected_features = mental_health_model.feature_names_in_
    user_input_processed_df_mh = user_input_processed_df.reindex(columns=mh_expected_features, fill_value=0)
    mental_health_pred = mental_health_model.predict(user_input_processed_df_mh)[0]
    mental_health_pred = max(0, min(100, mental_health_pred))  # clamp to [0,100] if needed

    
    pi_expected_features = physical_injury_model.feature_names_in_
    user_input_processed_df_pi = user_input_processed_df.reindex(columns=pi_expected_features, fill_value=0)
    physical_injury_pred = physical_injury_model.predict(user_input_processed_df_pi)[0]

   
    now = datetime.datetime.now()
    prediction_date = now.date().isoformat()
    prediction_time = now.time().isoformat(timespec="seconds")

    
    record = {
        "pain_level": input_data.pain_level,
        "mobility_score": input_data.mobility_score,
        "fatigue_level": input_data.fatigue_level,
        "adherence_to_recommendations": input_data.adherence_to_recommendations,
        "daily_activity_levels": input_data.daily_activity_levels,
        "sleep_quality": input_data.sleep_quality,
        "dietary_habits": input_data.dietary_habits,
        "mental_health_symptom_severity": float(mental_health_pred),
        "physical_injury_recovery_milestones": float(physical_injury_pred),
        "prediction_date": prediction_date,
        "prediction_time": prediction_time
    }
    result = supabase.table("health_predictions").insert(record).execute()
    result_dict = result.dict()
    if result_dict.get("error"):
        raise HTTPException(status_code=500, detail=f"Supabase insert error: {result_dict['error']}")

   
    return PredictionResponse(
        mental_health_symptom_severity=float(mental_health_pred),
        physical_injury_recovery_milestones=float(physical_injury_pred),
        prediction_date=prediction_date,
        prediction_time=prediction_time
    )
