

export default function Category({setToggle}){
 
    return (
        <>
<div id="filters" className="mb-3">
    <div className="filter">
      <div><i className="fa-solid fa-fire"></i></div>
      <p>Trending</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-house"></i></div>
      <p>Rooms</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-mountain-city"></i></div>
      <p>Iconic cities</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-mountain-sun"></i></div>
      <p>Mountains</p>
    </div>
    <div className="filter">
      <div><i className="fa-brands fa-fort-awesome"></i></div>
      <p>Castles</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-person-swimming"></i></div>
      <p>Amazing pools</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-campground"></i></div>
      <p>Campaing</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-tractor"></i></div>
      <p>Farms</p>
    </div>
    <div className="filter">
      <div><i className="fa-solid fa-snowflake"></i></div>
      <p>Arctics</p>
    </div>
  

    <div className="tax-toggle">
        <div className="form-check-reverse form-switch">
            <input className="form-check-input" type="checkbox" 
            role="switch" id="flexSwitchCheckDefault"
            onChange={setToggle}
            />
            <label className="form-check-label displaytotal" htmlFor="flexSwitchCheckDefault">Display total after taxes</label>
        </div>
    </div>
</div>
        </>
    )
}