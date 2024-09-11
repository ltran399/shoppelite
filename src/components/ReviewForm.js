import React, { useState } from 'react';

function ReviewForm({ productId, orderId }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); // Default rating of 5
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Ensure token is available for the request

    try {
      const response = await fetch('http://localhost:5002/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token for authentication
        },
        body: JSON.stringify({
          productId,
          reviewText,
          rating,
          orderId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message); // Display success message
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error); // Display error message
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="review-form">
      <h3>Submit a Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            {[...Array(5).keys()].map((r) => (
              <option key={r + 1} value={r + 1}>
                {r + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="reviewText">Review:</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ReviewForm;