import os
import datetime
import joblib
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, field_validator
from supabase import create_client, Client


load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase URL or Key is missing. Check your .env file.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()


model = joblib.load('mental_health2.pkl')

class UserInput(BaseModel):
    age: float
    sleep_quality: float
    physical_activity: float
    caffeine_intake: float
    social_interactions: float
    meditation_practice: str

    @field_validator("meditation_practice")
    @classmethod
    def convert_meditation_practice(cls, value):
        value = value.strip().lower()
        if value == "yes":
            return 1
        elif value == "no":
            return 0
        raise ValueError("meditation_practice must be 'yes' or 'no'")

class PredictionResponse(BaseModel):
    predicted_severity: float
    prediction_date: str
    prediction_time: str

@app.post("/predict", response_model=PredictionResponse)
async def predict(user_input: UserInput):
    input_data = [[
        user_input.age,
        user_input.sleep_quality,
        user_input.physical_activity,
        user_input.caffeine_intake,
        user_input.social_interactions,
        user_input.meditation_practice
    ]]
    try:
        predicted_severity = model.predict(input_data)[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

    predicted_severity = max(0, min(100, predicted_severity))

    now = datetime.datetime.now()
    prediction_date = now.date().isoformat()
    prediction_time = now.time().isoformat(timespec="seconds")

    record = {
        "age": user_input.age,
        "sleep_quality": user_input.sleep_quality,
        "physical_activity": user_input.physical_activity,
        "caffeine_intake": user_input.caffeine_intake,
        "social_interactions": user_input.social_interactions,
        "meditation_practice": user_input.meditation_practice,
        "predicted_severity": float(predicted_severity),
        "prediction_date": prediction_date,
        "prediction_time": prediction_time
    }

    result = supabase.table("mental_health_predictions").insert(record).execute()
    result_dict = result.dict()
    if result_dict.get("error"):
        raise HTTPException(status_code=500, detail=f"Supabase insert error: {result_dict['error']}")

    return PredictionResponse(
        predicted_severity=float(predicted_severity),
        prediction_date=prediction_date,
        prediction_time=prediction_time
    )
