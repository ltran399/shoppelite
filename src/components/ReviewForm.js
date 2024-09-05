// src/components/ReviewForm.js

import React, { useState } from 'react';

function ReviewForm({ productId }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),  // Assuming you store the logged-in user's ID in localStorage
          productId,
          reviewText,
          rating,
        }),
      });

      if (response.ok) {
        alert('Review submitted successfully!');
        setReviewText('');
        setRating(5);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;