import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!country.trim()) return;

    navigate(`/search?country=${country}`);
  };

  return (
    <div className="navbar-nav ms-auto">

      <form className="d-flex" role="search" onSubmit={handleSubmit}>

        <input
          className="form-control me-2 search-inp"
          type="search"
          placeholder="Enter country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button className="btn btn-search" type="submit">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>

      </form>

    </div>
  );
}