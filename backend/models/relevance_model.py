import sys
import json
import xgboost as xgb
import numpy as np
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

# Use the absolute path to load the model and vectorizer
model = joblib.load('/Users/lamtran/Documents/ShopeeLite/shopeelite/backend/models/relevance_model.pkl')
vectorizer = joblib.load('/Users/lamtran/Documents/ShopeeLite/shopeelite/backend/models/tfidf_vectorizer.pkl')

# Ensure reviewText is provided as a command-line argument
if len(sys.argv) < 2:
    print(json.dumps({"error": "Review text is required"}))
    sys.exit(1)

# Get the review text
review_text = sys.argv[1]

# Transform the review text using the vectorizer
X = vectorizer.transform([review_text])

# Predict the relevance score
score = model.predict(X)

# Output the relevance score in JSON format
print(json.dumps({"relevanceScore": float(score[0])}))
