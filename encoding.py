import pandas as pd
import math as math
import numpy as np

def encode_numeric_data(df):
    """
    Transforms all numeric columns in the DataFrame from the range [-2, 2] to [0, 10].
    If a numeric column contains values outside of [-2, 2], a warning is printed.
    
    Parameters:
        df (pd.DataFrame): Input DataFrame.
        
    Returns:
        pd.DataFrame: DataFrame with transformed numeric columns.
    """
    numeric_cols = df.select_dtypes(include='number').columns
    for col in numeric_cols:
        if not df[col].between(-2, 2).all():
            print(f"Warning: Column '{col}' has values outside of [-2, 2].")
        df[col] = np.log((df[col] + 3)) / np.log(5) * 10
    return df


input_file = '/Users/guddu/Desktop/lala/preprocessed_data.csv'  
output_file = 'encoded_output.csv'

# Read the CSV file
df = pd.read_csv(input_file)

# Encode numeric columns
df_encoded = encode_numeric_data(df)

# Save the transformed data to a new CSV file
df_encoded.to_csv(output_file, index=False)

print("Encoding complete. Transformed data saved to:", output_file)
