import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateReview({ onReviewCreated }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    content: "",
    rating: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `/listing/${id}/review`,
        { review: formData },
        { withCredentials: true }
      );
      
      toast.success(response.data.message);
      console.log("Review created:", response.data);
      
      // Reset form
      setFormData({
        content: "",
        rating: 5
      });
      
      // Call parent callback if provided
      if (onReviewCreated) {
        onReviewCreated(response.data.review);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to create review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 mb-5">
      
       <div className="row offset-3">
        <h4>Add a Review</h4>
      <form onSubmit={handleSubmit}>
     
   <div className="col-6">
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Review Content
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="3"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Share your experience..."
          />
        </div>
   </div>


        <div className="mb-3 col-3">
          <b>Rating</b>
          <fieldset className="starability-heart">
            {/* optional no-rate input allows resetting rating */}
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="rating"
              value={""}
              checked={formData.rating === ""}
              onChange={handleChange}
              aria-label="No rating."
            />
            <input
              type="radio"
              id="first-rate1"
              name="rating"
              value={1}
              checked={formData.rating === 1}
              onChange={handleChange}
            />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name="rating"
              value={2}
              checked={formData.rating === 2}
              onChange={handleChange}
            />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name="rating"
              value={3}
              checked={formData.rating === 3}
              onChange={handleChange}
            />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name="rating"
              value={4}
              checked={formData.rating === 4}
              onChange={handleChange}
            />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name="rating"
              value={5}
              checked={formData.rating === 5}
              onChange={handleChange}
            />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button
          type="submit"
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      </div>
    </div>
  );
}
