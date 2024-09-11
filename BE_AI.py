# train_AI.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import joblib

# Load dataset with comments labeled as relevant or irrelevant
data = pd.read_csv('ecommerce_comments.csv')  # Dataset with columns 'comment', 'label'
X = data['comment']
y = data['label']

# Split data for training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with text vectorizer and classifier
model = make_pipeline(TfidfVectorizer(), MultinomialNB())
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'comment_detector_model.pkl')
# app.py
from flask import Flask, request, jsonify
import joblib

app = Flask(__Irrelevant E-commerce Comment Detector __)

# Load the trained model
model = joblib.load('comment_detector_model.pkl')

@app.route('/')
def home():
    return "Welcome to the E-commerce Comment Detector!"

# API route to check if a comment is irrelevant
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)  # Extract JSON data
    comment = data.get('comment', '')
    
    # Predict if the comment is irrelevant
    prediction = model.predict([comment])[0]
    
    # Return result as JSON
    return jsonify({'comment': comment, 'is_irrelevant': bool(prediction)})

if __name__ == '__main__':
    app.run(debug=True)
