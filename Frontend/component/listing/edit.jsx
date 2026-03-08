import { useLocation, useParams ,useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function EditListing() {
  const navigate=useNavigate()
  const { id } = useParams();
  const location = useLocation();

  const passedListing = location.state?.listing;

  const [listing, setListing] = useState(
    passedListing || null
  );

  const [image, setImage] = useState(null);

 
  useEffect(() => {
    if (!passedListing) {
      axios.get(`/listing/${id}`)
        .then(res => setListing(res.data))
        .catch(err => console.log(err));
    }
  }, [id, passedListing]);

  if (!listing) return <h3>Loading...</h3>;

  const handleChange = (e) => {
    setListing({
      ...listing,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("listing[title]", listing.title);
    formData.append("listing[description]", listing.description);
    formData.append("listing[price]", listing.price);
    formData.append("listing[location]", listing.location);
    formData.append("listing[country]", listing.country);

    if (image) {
      formData.append("listing[img]", image);
    }

    try {
     const res= await axios.put(
        `/listing/${id}`,
        formData,{
          withCredentials:true,
        }
      );
     navigate(`/listing/${id}`,{
      state:{success:res.data.message}
     });

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to update listing";
      toast.error(errorMsg);
      if (err.response?.status === 403) {
        navigate("/");  // redirect if not owner
      }
    }
  };


  return (
    <div className="container mt-4">

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="row">

          <div className="col-lg-6 mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={listing.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-lg-12 mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={listing.description}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/*Show Current Image*/}
          <div className="col-lg-8 mb-3">
            <img
              src={listing.img?.url}
              alt=""
              style={{ height: "200px", width: "200px", borderRadius:"10px" }}
              className="img-fluid"
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Upload New Image</label>
            <input
              type="file"
              name="img"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>


          <div className="col-lg-4 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              value={listing.price}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-lg-8 mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={listing.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              name="country"
              value={listing.country}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

        </div>

        <button className="btn btn-danger">Submit</button>

      </form>
    </div>
  );
}