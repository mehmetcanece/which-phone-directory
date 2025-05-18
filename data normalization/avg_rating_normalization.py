import pandas as pd

# Dataseti oku
df = pd.read_csv("Hashed_Phone_Dataset.csv")

# avg_rating sütununu sayıya çevir
df["avg_rating"] = pd.to_numeric(df["avg_rating"], errors="coerce")

# 0.0 olanları eksik değer olarak kabul edip medyanla doldur
median_rating = df.loc[df["avg_rating"] != 0.0, "avg_rating"].median()
df.loc[df["avg_rating"] == 0.0, "avg_rating"] = median_rating

# Min-Max normalizasyonu uygula
min_rating = df["avg_rating"].min()
max_rating = df["avg_rating"].max()
df["normalized_avg_rating"] = (df["avg_rating"] - min_rating) / (max_rating - min_rating)

# Yeni dosyayı kaydet
df.to_csv("Hashed_Phone_Dataset_Normalized.csv", index=False)

# Bilgi mesajı
print("avg_rating sütunundaki 0.0 değerler medyan ile dolduruldu ve Min-Max normalizasyonu uygulandı.")
print(df[["avg_rating", "normalized_avg_rating"]].head())