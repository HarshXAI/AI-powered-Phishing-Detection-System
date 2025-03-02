from fastapi.responses import JSONResponse
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import numpy as np
import joblib
import sys
import re
import string
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd
import re
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from transformers import BertTokenizer, BertForSequenceClassification
from fastapi import FastAPI
import nest_asyncio
import uvicorn
from pydantic import BaseModel

# Load Dataset
def load_data():
    df = pd.read_csv('Dataset_5971.csv')
    df.dropna(inplace=True)
    return df

# Preprocessing Function
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

# Feature Engineering
def extract_features(df):
    df['Text'] = df['TEXT'].apply(preprocess_text)
    df['has_email'] = df['EMAIL'].apply(lambda x: 1 if x.lower() == 'yes' else 0)
    df['has_phone'] = df['PHONE'].apply(lambda x: 1 if x.lower() == 'yes' else 0)
    df['has_url'] = df['URL'].apply(lambda x: 1 if x.lower() == 'yes' else 0)
    return df

# Vectorizing Text Data
tfidf = TfidfVectorizer(max_features=10000)

def preprocess_data(df):
    X_text = tfidf.fit_transform(df['TEXT']).toarray()  
    X_features = df[['has_email', 'has_phone', 'has_url']].values
    X = np.hstack((X_text, X_features))    
    df['LABEL'] = df['LABEL'].str.strip().str.lower()
    y = df['LABEL'].map({'ham': 0, 'spam': 1, 'smishing': 2})
    return train_test_split(X, y, test_size=0.2, random_state=42)

# Train ML Model
def train_ml_model(X_train, y_train):
    model = RandomForestClassifier(n_estimators=100)
    model.fit(X_train, y_train)
    return model

# Deep Learning Model (BERT)
class SpamDetector(nn.Module):
    def __init__(self):
        super(SpamDetector, self).__init__()
        self.bert = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=3)
    
    def forward(self, input_ids, attention_mask):
        return self.bert(input_ids, attention_mask=attention_mask)

nest_asyncio.apply()
app = FastAPI()

class MessageRequest(BaseModel):
    TEXT: str

phonePattern = re.compile(r'(\d{3})\D*(\d{3})\D*(\d{4})\D*(\d*)$')
emailPattern = re.compile(("([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`" "{|}~-]+)*(@|\sat\s)(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(\.|" "\sdot\s))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"))

def phoneNumber_check(line):
    if phonePattern.search(line) is not None:
        return 1
    else:
        return 0

def email_check(line):
    if emailPattern.search(line) is not None:
        return 1
    else:
        return 0
    
def http_check(line):
    http = re.findall('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', line)
    if not http:
        return 0
    else:
        return 1

@app.post("/detect")
def detect_message(request: MessageRequest):
    has_url = http_check(request.TEXT)
    has_email = email_check(request.TEXT)
    has_phone = phoneNumber_check(request.TEXT)
    features = pd.DataFrame({'has_url': [has_url], 'has_email': [has_email], 'has_phone': [has_phone]})
    X_text = tfidf.transform([request.TEXT]).toarray()
    X_features = features[['has_email', 'has_phone', 'has_url']].values
    X = np.hstack((X_text, X_features))
    prediction = ml_model.predict(X)[0]
    label_map = {0: "ham", 1: "spam", 2: "Smishing"}
    return JSONResponse({"content": request.TEXT, "prediction": label_map[prediction]})

@app.post("/classify-url")
def classify():
    try:
        data = request.json
        url = data.get('url')
        
        if not url:
            return jsonify({'error': 'No URL provided'}), 400
        
        result = subprocess.run(
            [sys.executable, 'test.py', url], 
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,  
            text=True
        )

        raw_output = result.stdout.strip()
        error_output = result.stderr.strip()
        
        print(f"Raw subprocess output: {raw_output}")  # ✅ Debugging
        print(f"Error output: {error_output}") 

        return JSONResponse({
            'url': url,
            'prediction': raw_output
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse({'error': str(e)}), 500

if __name__ == '__main__':
    df = load_data()
    df = extract_features(df)
    X_train, X_test, y_train, y_test = preprocess_data(df)
    ml_model = train_ml_model(X_train, y_train)
    uvicorn.run(app, host="127.0.0.1", port=8000)