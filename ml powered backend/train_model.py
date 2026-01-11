# train_models.py
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
import os

df = pd.read_csv("data/products.csv")

os.makedirs("models", exist_ok=True)

# -------------------------------
# 1. PRICE PREDICTION MODEL
# -------------------------------
price_features = pd.get_dummies(df[["category", "brand", "rating"]])
price_model = LinearRegression()
price_model.fit(price_features, df["price"])

joblib.dump(price_model, "models/price_model.pkl")
joblib.dump(price_features.columns.tolist(), "models/price_features.pkl")


# -------------------------------
# 2. SALES PREDICTION MODEL
# -------------------------------
sales_features = df[["price", "discount", "rating"]]
sales_model = LinearRegression()
sales_model.fit(sales_features, df["sales"])

joblib.dump(sales_model, "models/sales_model.pkl")


# -------------------------------
# 3. PRODUCT RECOMMENDATION MODEL
# -------------------------------
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(df["title"])

joblib.dump(vectorizer, "models/vectorizer.pkl")
joblib.dump(df["title"].tolist(), "models/titles.pkl")

print("All models trained and saved!")
