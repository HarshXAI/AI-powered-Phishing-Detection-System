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

app = Flask(__name__)
CORS(app)

def train():
    # Load dataset (Ensure your CSV file has columns 'v1' (spam/ham) and 'v2' (message))
    data = pd.read_csv('spam.csv', encoding='latin-1')

    # Convert 'spam' to 1 and 'ham' to 0
    data['label'] = data['v1'].map({'spam': 1, 'ham': 0})

    # Text Preprocessing Function
    def clean_text(text):
        text = text.lower()  # Convert to lowercase
        text = re.sub(r'\d+', '', text)  # Remove numbers
        text = text.translate(str.maketrans('', '', string.punctuation))  # Remove punctuation
        text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
        return text

    # Apply cleaning to the messages
    data['cleaned_message'] = data['v2'].apply(clean_text)

    # Convert text into numerical representation using TF-IDF
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(data['cleaned_message'])

    # Labels (Spam = 1, Ham = 0)
    y = data['label']

    # Split Data (80% Train, 20% Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train Logistic Regression Model
    model = LogisticRegression()
    model.fit(X_train, y_train)

    # Predictions on Test Data
    y_pred = model.predict(X_test)

    # Model Evaluation
    print("🔹 Accuracy:", accuracy_score(y_test, y_pred))
    print("\n🔹 Classification Report:\n", classification_report(y_test, y_pred))

    # Test with a New Message
    new_messages = [
        "Your account has been compromised. Click here to reset your password.",
        "Hey! Are we still meeting at 5 PM?",
        "Congratulations! You've won a free iPhone. Claim now!"
    ]

    # Preprocess and Predict for New Messages
    new_messages_cleaned = [clean_text(msg) for msg in new_messages]
    new_messages_vectorized = vectorizer.transform(new_messages_cleaned)
    predictions = model.predict(new_messages_vectorized)

    # Print Results
    for msg, pred in zip(new_messages, predictions):
        print(f"\n🔹 Message: {msg}")
        print("➡ Prediction:", "Phishing" if pred == 1 else "Legitimate")
@app.route('/classify-url', methods=['POST'])
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

        return jsonify({
            'url': url,
            'prediction': raw_output
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/classify-text', methods=['POST'])
def classify_text():
    try:
        data = request.json
        text = data.get('text')

        def clean_text(text):
            text = text-.lower() 
            text = re.sub(r'\d+', '', text)
            text = text.translate(str.maketrans('', '', string.punctuation))  
            text = re.sub(r'\s+', ' ', text).strip()
            return text
        
        vectorizer = joblib.load("vectorizer (2).pkl")
        vectorizer.fit([["ummy","vsvsddvssddsddsddsddsddsdsd"], ["ummy","vsvsddvssddsddsddsddsddsdsd"]])
        # Apply cleaning to the messages
        text_refined = clean_text(text)
        new_messages_vectorized = vectorizer.transform([text_refined])
        if not text:
            return jsonify({'error': 'No text provided'}), 400
    
        prediction = joblib.load("phishing_model.pkl").predict([new_messages_vectorized])
        raw_output = "PHISHING" if prediction[0] == -1 else "SAFE"
        

        return jsonify({
            'text': text,
            'prediction': raw_output
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)