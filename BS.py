# Import necessary libraries
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from flask import Flask, request, jsonify

# Step 1: Create and train the model

# Sample data: List of reviews with labels (1 = irrelevant, 0 = relevant)
data = {
    'review': [
        "This product is amazing!", 
        "Check out this other product from a competitor.",
        "Fast shipping, but I hate the color.", 
        "Buy from this link instead!", 
        "Works as expected."
    ],
    'label': [0, 1, 1, 1, 0]
}
df = pd.DataFrame(data)

# Text vectorization and model pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('classifier', MultinomialNB())
])

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(df['review'], df['label'], test_size=0.2, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Step 2: Set up the Flask API

# Initialize Flask app
app = Flask(__name__)

# Route for prediction
@app.route('/predict', methods=['POST'])
def predict():
    review = request.json['review']
    prediction = pipeline.predict([review])[0]
    return jsonify({'is_irrelevant': bool(prediction)})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
