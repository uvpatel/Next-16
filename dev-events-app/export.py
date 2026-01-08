from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))

print(client.list_database_names())

db = client["test"]
print(db.list_collection_names())


col = db["bookings"]

cursor = col.find()
data = list(cursor)

print(data)

df = pd.DataFrame(data)
print(df.head())

output_file = "bookings.xlsx"
df.to_excel(output_file, index=False)

print(f"✅ Excel file created: {output_file}")
