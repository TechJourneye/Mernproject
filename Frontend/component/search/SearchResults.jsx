import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPage from "../error";

export default function SearchResults() {

  const location = useLocation();

  const [listings, setListings] = useState([]);
  const [errorMSG, setErrorMSG] = useState("");

  const params = new URLSearchParams(location.search);
  const country = params.get("country");

  useEffect(() => {

  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/listing/search?country=${country}`,
        { withCredentials: true }
      );

      if (res.data.length === 0) {
        setErrorMSG(`No results found for "${country}"`);
        setListings([]);
      } else {
        setErrorMSG("");
        setListings(res.data);
      }

    } catch (err) {
      console.log(err);
      setErrorMSG("Something went wrong");
    }
  };

  if (country) {
    search();
  }

}, [country]);

  if (errorMSG) {
    return <ErrorPage error={errorMSG} />;
  }

  return (
    <div className="container">

      <h3>Results for {country}</h3>

      {listings.map((listing) => (
        <div key={listing._id}>
          <Link to={`/listing/${listing._id}`} style={{textDecoration:"none"}}>
            <h5>{listing.title}</h5>
          </Link>
        </div>
      ))}

    </div>
  );
}