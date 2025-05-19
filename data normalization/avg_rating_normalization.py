import pandas as pd

df = pd.read_csv("Hashed_Phone_Dataset.csv")

df["avg_rating"] = pd.to_numeric(df["avg_rating"], errors="coerce")

median_rating = df.loc[df["avg_rating"] != 0.0, "avg_rating"].median()
df.loc[df["avg_rating"] == 0.0, "avg_rating"] = median_rating

min_rating = df["avg_rating"].min()
max_rating = df["avg_rating"].max()
df["normalized_avg_rating"] = (df["avg_rating"] - min_rating) / (max_rating - min_rating)

df.to_csv("Hashed_Phone_Dataset_Normalized.csv", index=False)

print("avg_rating sütunundaki 0.0 değerler medyan ile dolduruldu ve Min-Max normalizasyonu uygulandı.")
print(df[["avg_rating", "normalized_avg_rating"]].head())