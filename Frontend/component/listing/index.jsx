import { Link,Navigate,useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import Description from "../description";
import Title from "../title";
import FlashMSG from "../includes/flashMSG";
import Category from "./category";
import GSTComponent from "../GSTComponent";
 function Index(){
    const location=useLocation();
    const navigate=useNavigate();
    const [listings,setListing]=useState([]);
    const [taxShown,setTaxShown]=useState(false);
    const toastShown = useRef(false);
    
    useEffect(()=>{
       const allListing=async()=>{
        let res=await axios.get("/listing")
        setListing(res.data);  
       }
       allListing()
    },[]);

    useEffect(()=>{
     if(location.state?.success && !toastShown.current)   {
        toastShown.current = true;
        toast.success(location.state.success);
        navigate(location.pathname,{replace:true});
     }
     
    },[location.pathname,location.state,navigate])
    const setToggle=()=>{
        setTaxShown(!taxShown);
    }
    return (
        <>
      <div className="container mt-3 all-listing mb-3"> 
        <Category setToggle={setToggle}/>
                <div className="row g-4">
                {listings.map((listing,idx)=>(
                 
                        <div className="col-12  col-md-6 col-lg-4" key={idx}>
                            <Link to={`/listing/${listing._id}`} style={{textDecoration:"none"}}>
                            <div className="card all-listing" style={{width: "18rem"}}>
                                <img src={listing.img.url} className="card-img-top cardImage"  alt="..."/>
                                <div className="card-body">
                                     <Title title={listing.title}/>
                                        <p className="card-text price"> Price:&#8377;<b>{listing.price.toLocaleString("en-IN")}/night</b>
                                            {taxShown&&<GSTComponent/>}
                                        </p>
                                     <Description text={listing.description}/>
                                    {/* <Link to="/" className="btn btn-primary">Go somewhere</Link> */}
                                </div>
                            </div>
                            </Link>
                        </div>
              
                ))
            
            }
    </div>
    </div>  
        </>
    )
}
export default Index;