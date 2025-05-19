import pandas as pd
import numpy as np
import warnings

warnings.filterwarnings("ignore", category=RuntimeWarning)

df = pd.read_csv('Hashed_Phone_Dataset_Normalized.csv')

df['battery_capacity'] = df['battery_capacity'].replace(0, np.nan)

df['battery_capacity'] = df.groupby(
    ['ram_capacity', 'internal_memory', 'screen_size']
)['battery_capacity'].transform(lambda x: x.fillna(x.median()))

df['battery_capacity'] = df['battery_capacity'].fillna(df['battery_capacity'].median())

df = df.drop('avg_rating', axis=1)

df = df.rename(columns={'normalized_avg_rating': 'avg_rating'})

df['avg_rating'] = df['avg_rating'] * 10
df['avg_rating'] = df['avg_rating'].round(2)
 
df.to_csv('Hashed_Phone_Dataset_Normalized_Final.csv', index=False)



