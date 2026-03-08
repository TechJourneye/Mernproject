import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const navigate=useNavigate();
   const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

  if (isSubmitting) return;
  setIsSubmitting(true);
    const formData = new FormData(e.target); // collect all inputs automatically

    try {

      let res = await axios.post(
        "http://localhost:8080/listing",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      );
        e.target.reset(); 
      navigate(`/listing/${res.data.listing._id}`, {
        state: { success: res.data.message }
      });

    }  catch (err) {
    toast.error("Listing creation failed");
  } finally {
    setIsSubmitting(false);
  }
  };

  return (

    <div className="container mt-4">

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="needs-validation"
        noValidate
      >

        <br />

        <div className="row">

          <div className="col-6">
            <label className="form-label">Title</label>

            <input
              type="text"
              name="listing[title]"
              placeholder="Enter Title"
              className="form-control"
              required
            />

            <div className="valid-feedback">
              Looks good!
            </div>
          </div>


          <div className="mt-3">
            <label className="form-label">Description</label>

            <textarea
              name="listing[description]"
              className="form-control"
              placeholder="Enter some description"
              required
            />

            <div className="invalid-feedback">
              Please Give a Short Description!
            </div>
          </div>


          <div className="mt-3">
            <label className="form-label">Upload Image</label>

            <input
              type="file"
              name="listing[img]"
              className="form-control"
            />
          </div>


          <div className="mt-3">
            <label className="form-label">Location</label>

            <input
              type="text"
              name="listing[location]"
              placeholder="Give Location"
              className="form-control"
              required
            />

            <div className="invalid-feedback">
              Provide a Valid Location!
            </div>
          </div>


          <div className="row mt-3">

            <div className="col-4">
              <label className="form-label">Price</label>

              <input
                type="number"
                name="listing[price]"
                placeholder="Enter Price"
                className="form-control"
              />

              <div className="invalid-feedback">
                Enter Price!
              </div>
            </div>


            <div className="col-6">
              <label className="form-label">Country</label>

              <input
                type="text"
                name="listing[country]"
                placeholder="Enter Country Name"
                className="form-control"
                required
              />

              <div className="invalid-feedback">
                Provide a Valid Country Name!
              </div>
            </div>

          </div>

        </div>

        <br />

       <button className="btn btn-success" disabled={isSubmitting}>
  {isSubmitting ? "Creating listing..." : "Submit"}
</button>

        <br />

      </form>

    </div>
  );
}