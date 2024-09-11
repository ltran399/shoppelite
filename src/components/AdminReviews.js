import React, { useEffect, useState, useCallback } from 'react';
import './AdminReviews.css';

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchReviews in useCallback to avoid re-creation on every render
  const fetchReviews = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5002/api/admin/reviews', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch reviews');
      
      const data = await response.json();
      const reviewsWithScores = await Promise.all(
        data.map(async (review) => {
          const relevanceScore = await fetchRelevanceScore(review.reviewText);
          return { ...review, relevanceScore: Math.round(relevanceScore) };  // Rounding here
        })
      );
      setReviews(reviewsWithScores);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []); // Empty array means no dependencies, so the function will only be created once

  const fetchRelevanceScore = async (reviewText) => {
    try {
      const response = await fetch('http://localhost:5002/api/relevance-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.relevanceScore;
    } catch (err) {
      console.error('Error fetching relevance score:', err.message);
      return 'N/A';
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`http://localhost:5002/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== reviewId));
        alert('Review deleted successfully.');
      } else {
        alert('Failed to delete review.');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review.');
    }
  };

  const getRowStyle = (relevanceScore) => {
    if (relevanceScore === 'N/A') {
      return {};
    }
    return relevanceScore < 50 ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'green', color: 'white' };
  };

  useEffect(() => {
    fetchReviews(); // Call the wrapped fetchReviews
  }, [fetchReviews]); // Include fetchReviews as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-reviews-container">
      <h1>Manage Reviews</h1>
      <table className="admin-reviews-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Review Text</th>
            <th>Rating</th>
            <th>Created At</th>
            <th>Relevance Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} style={getRowStyle(review.relevanceScore)}>
              <td>{review.user?.username || review.user?.email || 'Unknown User'}</td>
              <td>{review.orderId}</td>
              <td>{review.productId}</td>
              <td>{review.reviewText}</td>
              <td>{review.rating}</td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>{review.relevanceScore}</td> {/* Display rounded relevance score */}
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReviews;
