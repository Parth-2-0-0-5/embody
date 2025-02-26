import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import MinMaxScaler
import joblib

df = pd.read_csv('new_dataset.csv')

if 'Severity' not in df.columns:
    df['Severity_raw'] = (
          (5 - df['Sleep_Quality']) * 10  
        + (5 - df['Physical_Activity']) * 8  
        + (5 - df['Social_Interactions']) * 7  
        + df['Age'] * 0.1  
        + df['Caffeine_Intake'] * 0.5  
        - df['Meditation_Practice'] * 5  
    )
    scaler = MinMaxScaler(feature_range=(0, 100))
    df['Severity'] = scaler.fit_transform(df[['Severity_raw']])
    df.drop(columns=['Severity_raw'], inplace=True)

features = ['Age', 'Sleep_Quality', 'Physical_Activity', 'Caffeine_Intake', 'Social_Interactions', 'Meditation_Practice']
X = df[features]
y = df['Severity']

model = LinearRegression()
model.fit(X, y)

print("\nEnter the following details for mental health severity prediction:")

age = float(input("Age: "))
sleep_quality = float(input("Sleep Quality (0 to 5): "))
physical_activity = float(input("Physical Activity (0 to 5): "))
caffeine_intake = float(input("Caffeine Intake (numeric value): "))
social_interactions = float(input("Social Interactions (0 to 5): "))

while True:
    meditation_input = input("Meditation Practice (yes/no): ").strip().lower()
    if meditation_input in ['yes', 'no']:
        meditation_practice = 1 if meditation_input == 'yes' else 0
        break
    else:
        print("Invalid input! Please enter 'yes' or 'no'.")

user_features = pd.DataFrame([[age, sleep_quality, physical_activity, caffeine_intake, social_interactions, meditation_practice]],
                             columns=features)

predicted_severity = model.predict(user_features)[0]
predicted_severity = max(0, min(100, predicted_severity))  

print(f"\nPredicted Mental Health Severity: {predicted_severity:.2f}/100")

joblib.dump(model, 'mental_health2.pkl')


