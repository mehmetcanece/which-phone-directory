import pandas as pd
import csv
import hashlib

df = pd.read_csv("Phone_Dataset_Cpu-and-Price_Final.csv", on_bad_lines="skip", quoting=csv.QUOTE_MINIMAL)

def hash_text(text):
    return int(hashlib.sha256(str(text).encode()).hexdigest(), 16) % 10**8  

df["hashed_brand_name"] = df["brand_name"].apply(hash_text)
df["hashed_model"] = df["model"].apply(hash_text)

df = df.drop(["brand_name"], axis=1)
df = df.drop(["model"], axis=1)
df = df.drop(["processor_brand"], axis=1)


df.to_csv("Hashed_Phone_Dataset.csv", index=False)

print(df.head())