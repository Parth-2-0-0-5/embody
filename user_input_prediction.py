import pandas as pd
import joblib
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer

# Load pre-trained models
mental_health_model = joblib.load('mental_health_model.pkl') 
physical_injury_model = joblib.load('physical_injury_model.pkl') 

# Define feature lists
numeric_features = [
    "Pain Level (0-10)", "Mobility Score", "Fatigue Level (1-5)",
    "Adherence to Recommendations (%)", "Daily Activity Levels", 
    "Sleep Quality (1-10)", "Dietary Habits (1-5)"
]
categorical_features = [
    "Gender", "Marital Status", "Education Level (Adults 20+)",
    "Household Reference Person Gender"
]

# Create pipelines for numeric and categorical data
numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])
categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

# Combine into a preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)

# Prompt user for numeric input only
print("Enter the following numeric details:")
user_input = {}

for feature in numeric_features:
    while True:
        try:
            value = float(input(f"{feature}: "))
            break
        except ValueError:
            print("Invalid input! Please enter a numeric value.")
    user_input[feature] = [value]

# Provide default values for categorical features (adjust these as needed)
default_categorical_values = {
    "Gender": "M",
    "Marital Status": 1,
    "Education Level (Adults 20+)": 3,
    "Household Reference Person Gender": 2
}

for feature in categorical_features:
    user_input[feature] = [default_categorical_values[feature]]

# Convert user input into a DataFrame
user_input_df = pd.DataFrame(user_input)

# Preprocess the user input
user_input_processed = preprocessor.fit_transform(user_input_df)
processed_feature_names = preprocessor.get_feature_names_out()
user_input_processed_df = pd.DataFrame(user_input_processed, columns=processed_feature_names)

# Prepare data for mental health prediction
expected_features_mental_health = mental_health_model.feature_names_in_
user_input_processed_df_mh = user_input_processed_df.reindex(columns=expected_features_mental_health, fill_value=0)
mental_health_pred = mental_health_model.predict(user_input_processed_df_mh)

# Prepare data for physical injury prediction
expected_features_physical_injury = physical_injury_model.feature_names_in_
user_input_processed_df_pi = user_input_processed_df.drop(columns=["Recovery Milestones Achieved"], errors="ignore")
user_input_processed_df_pi = user_input_processed_df_pi.reindex(columns=expected_features_physical_injury, fill_value=0)
physical_injury_pred = physical_injury_model.predict(user_input_processed_df_pi)

# Output the predictions
print(f"\nPredicted Mental Health Symptom Severity: {mental_health_pred[0]}")
print(f"Predicted Physical Injury Recovery Milestones: {physical_injury_pred[0]}")
