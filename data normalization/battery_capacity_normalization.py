import pandas as pd
import numpy as np
import warnings

# Uyarıları bastır
warnings.filterwarnings("ignore", category=RuntimeWarning)

# Veriyi oku
df = pd.read_csv('Hashed_Phone_Dataset_Normalized.csv')

# 0'ları eksik veri olarak kabul et
df['battery_capacity'] = df['battery_capacity'].replace(0, np.nan)

# Grup bazlı medyan ile doldur
df['battery_capacity'] = df.groupby(
    ['ram_capacity', 'internal_memory', 'screen_size']
)['battery_capacity'].transform(lambda x: x.fillna(x.median()))

# Hâlâ eksik kalanları genel medyan ile doldur
df['battery_capacity'] = df['battery_capacity'].fillna(df['battery_capacity'].median())

# avg_rating sütununu sil
df = df.drop('avg_rating', axis=1)

# normalized_avg_rating sütununun adını avg_rating yap
df = df.rename(columns={'normalized_avg_rating': 'avg_rating'})

# avg_rating sütununu 10la çarpıp virgülden sonra 2 hanewsini al
df['avg_rating'] = df['avg_rating'] * 10
df['avg_rating'] = df['avg_rating'].round(2)
 
# Dosyayı kaydet (isteğe bağlı)
df.to_csv('Hashed_Phone_Dataset_Normalized_Final.csv', index=False)



