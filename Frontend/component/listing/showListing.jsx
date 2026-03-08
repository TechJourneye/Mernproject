import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {useRef ,useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Title from "../title";
import Description from "../description";
import CreateReview from "../review/CreateReview";
import ListingMap from "../map";
import ErrorPage from "../error";
import ShowReview from "../review/showReview";

export default function ShowListing() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies] = useCookies(["token"]);
    const toastShown = useRef(false);

    const [listing, setListing] = useState(null); // null until fetched
    const [notFound, setNotFound] = useState(false); // flag when API returns 404
    const [errorMsg, setErrorMsg] = useState(""); // message from server if any
    const [currentUserId, setCurrentUserId] = useState(null);

    /* ---------- DECODE TOKEN TO GET CURRENT USER ID ---------- */
    useEffect(() => {
        if (cookies.token) {
            try {
                const decoded = jwtDecode(cookies.token);
                setCurrentUserId(decoded.id);
            } catch (err) {
                console.log("Token decode error:", err);
            }
        }
    }, [cookies.token]);

    /* ---------------- SHOW TOAST ONCE ---------------- */

    useEffect(() => {
        if (location.state?.success && !toastShown.current) {
            toastShown.current = true;
            toast.success(location.state.success);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, navigate, location.pathname]);

    /*  FETCH LISTING  */

    useEffect(() => {
        const fetchListing = async () => {
            try {
                let res = await axios.get(`/listing/${id}`);
                setListing(res.data);
            } catch (err) {
                if (err.response) {
                    const msg = err.response.data?.message || "Listing not found";
                    setErrorMsg(msg);
                    if (err.response.status === 404) {
                        setNotFound(true);
                    }
                } else {
                    console.log(err);
                    setErrorMsg("Network error");
                }
            }
        };
        fetchListing();
    }, [id,listing]);

    if (errorMsg) return <ErrorPage message={errorMsg} />;

    // still loading data
    if (!listing) return <div>Loading...</div>;

    /* ---------------- HANDLERS ---------------- */

    // called by CreateReview when a new review is created
    const handleReviewCreated = (newReview) => {
        setListing((prev) => ({
            ...prev,
            reviews: prev.reviews ? [...prev.reviews, newReview] : [newReview]
        }));
    };


    const handleEdit = () => {
        navigate(`/listing/${id}/edit`, {
            state: { listing }
        });
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(
                `/listing/${id}`,
                { withCredentials: true }
            );

            navigate("/", {
                state: { success: res.data.message }
            });

        } catch (err) {
            if (err.response) {
            toast.error(err.response.data.message || "Not authorized");
        } else {
            toast.error("Something went wrong");
        }
        }
    };

    // delete a review and update local state
    const handleReviewDelete = async (reviewId) => {
        try {
            const res = await axios.delete(
                `/listing/${id}/review/${reviewId}`,
                {withCredentials:true},
            );
            // remove review from listing state
            setListing((prev) => ({
                ...prev,
                reviews: prev.reviews.filter((r) => r._id !== reviewId)
            }));
            toast.success(res.data.message || "Review deleted");
        } catch (err) {
            console.log(err);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    return (
        <>
            <div className="row g-3">
                <div className="offset-3 col-6 mt-5">

                    <p>owned by: <strong>@{listing.owner.username}</strong></p>

                    <Title title={listing.title} />

                    <img
                        src={listing.img.url}
                        className="showimg"
                        alt="listing"
                    />

                    <div className="listing-details">
                        <p>&#8377; {listing.price.toLocaleString("en-IN")}</p>
                        <p><b>Country </b>: {listing.country}</p>
                        <p><b>Location </b>: {listing.location}</p>
                        <Description text={listing.description} need={false} />
                    </div>

                    {/* Show Edit & Delete only if user is owner */}
                    {currentUserId && listing.owner && currentUserId === listing.owner._id && (
                        <>
                            <button
                                onClick={handleEdit}
                                className="btn btn-primary mt-3"
                            >
                                Edit
                            </button>

                            <button
                                onClick={handleDelete}
                                className="btn btn-danger mt-3 ms-2"
                            >
                                Delete
                            </button>
                        </>
                    )}
   <hr />
   <ListingMap
  coordinates={listing.geometry.coordinates}
  location={listing.location}
/>
   <hr />
                    {/* Reviews Section */}
                    <ShowReview
                        listing={listing}
                        currentUserId={currentUserId}
                        handleReviewDelete={handleReviewDelete}
                        formatDate={formatDate}
                    />
                </div>
            </div>

            <div className="row g-3">
                <div className="offset-3 col-6 mt-5">
                            <CreateReview onReviewCreated={handleReviewCreated} />
                </div>
            </div>
        </>
    );
}