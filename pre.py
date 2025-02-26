import pandas as pd
import numpy as np
df = pd.read_csv('stress_detection_data.csv')
columns_to_keep = ['Age', 'Sleep_Quality', 'Physical_Activity', 'Caffeine_Intake', 'Social_Interactions', 'Meditation_Practice']
df = df[columns_to_keep]

df['Meditation_Practice'] = df['Meditation_Practice'].str.lower().map({'yes': 1, 'no': 0})
df['Physical_Activity'] = df['Physical_Activity'].apply(lambda x: int(np.ceil(x)))
df.to_csv('new_dataset.csv', index=False)