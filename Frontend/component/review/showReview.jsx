export default function ShowReview({ listing, currentUserId, handleReviewDelete, formatDate }) {

  return (
    <div className="mt-5">

      <h4>Reviews ({listing.reviews?.length || 0})</h4>

      {listing.reviews && listing.reviews.length > 0 ? (
        <div className="row mt-4">

          {listing.reviews.map((review) => (
            <div key={review._id} className="col-12 mb-3">

              <div className="card">
                <div className="card-body">

                  <div className="d-flex justify-content-between align-items-start mb-2">

                    <div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        @{review.author.username}
                      </h6>

                      <p
                        style={{ fontSize: "0.6rem" }}
                        className="starability-result card-text"
                        data-rating={review.rating}
                      >
                        Rated: {review.rating} stars
                      </p>
                    </div>

                    <small className="text-muted">
                      {formatDate(review.createdAt)}
                    </small>

                  </div>

                  <p className="card-text">
                    {review.content}
                  </p>

                  {currentUserId === review.author._id && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReviewDelete(review._id)}
                    >
                      Delete
                    </button>
                  )}

                </div>
              </div>

            </div>
          ))}

        </div>
      ) : (
        <p className="text-muted mt-3">
          No reviews yet. Be the first to review!
        </p>
      )}

    </div>
  );
}