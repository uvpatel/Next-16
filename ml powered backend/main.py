# main.py
from fastapi import FastAPI
import joblib
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load ML models
price_model = joblib.load(os.path.join(BASE_DIR, "models/price_model.pkl"))
sales_model = joblib.load(os.path.join(BASE_DIR, "models/sales_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "models/vectorizer.pkl"))

price_columns = joblib.load(os.path.join(BASE_DIR, "models/price_features.pkl"))
titles = joblib.load(os.path.join(BASE_DIR, "models/titles.pkl"))

@app.get("/")
def home():
    return {"message": "Ecommerce ML Backend Running!"}


# --------------------------
# 1. Price Recommendation
# --------------------------
@app.get("/predict-price")
def predict_price(category: str, brand: str, rating: float):
    data = pd.DataFrame([[category, brand, rating]], columns=["category", "brand", "rating"])
    data = pd.get_dummies(data).reindex(columns=price_columns, fill_value=0)

    price = price_model.predict(data)[0]
    return {"suggested_price": round(float(price), 2)}


# --------------------------
# 2. Sales Prediction
# --------------------------
@app.get("/predict-sales")
def predict_sales(price: float, discount: float, rating: float):
    x = np.array([[price, discount, rating]])
    sales = sales_model.predict(x)[0]
    return {"predicted_sales": round(float(sales), 2)}


# --------------------------
# 3. Similar Product Recommender
# --------------------------
@app.get("/recommend")
def recommend(title: str):
    input_vec = vectorizer.transform([title])
    product_vec = vectorizer.transform(titles)

    similarity = cosine_similarity(input_vec, product_vec)[0]
    top_idx = similarity.argsort()[::-1][1:4]

    recommended = [titles[i] for i in top_idx]
    return {"similar_products": recommended}

@app.get("/products")
def get_products():
    return {
        "products": [
            {
                "_id": "1",
                "productname": "iPhone 14",
                "description": "Apple flagship phone",
                "price": 80000,
                "image": "",
                "category": "Mobile",
                "stock": 20,
            },
            {
                "_id": "2",
                "productname": "Samsung S22",
                "description": "Samsung premium phone",
                "price": 60000,
                "image": "",
                "category": "Mobile",
                "stock": 18,
            }
        ]
    }

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


