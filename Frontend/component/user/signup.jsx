 import { useState } from "react"
 import { useNavigate,Link } from "react-router-dom"
 import axios from "axios"


  import { ToastContainer,toast } from "react-toastify";

export default function Signup(){
     const navigate=useNavigate();
    const [inputValue,setInputValue]=useState({
        username:"",
        email:"",
        password:"",
    });
 const { email, password, username } = inputValue;
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
       setInputValue((prevInput)=>({
          ...prevInput,[name]:value
       }))
    }
    const handleError=(msg)=>{
        toast.error(msg);
    }
    const handleSuccess=(msg)=>{
        toast.success(msg);
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
      const { data } = await axios.post(
        "/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      console.log(success,message,"hi")
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(inputValue);
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });
    }
    return (
         <div className="container">
       <div className="row offset-3">
         <h2>Signup Account</h2>
     
      
      <form onSubmit={handleSubmit} className="needs-validation" >
        <div className=" col-6">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            required
          />
          <div className="valid-feedback"> Looks good!</div>
        </div>
        <div className="col-6">
          <label htmlFor="email" className="form-label">Username</label>
          <input
           className=" form-control"
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="col-6">
          <label htmlFor="password" className="form-label">Password</label>
          <input
           className=" form-control"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            required
          />
        </div>


    <div className="col-6 mt-2">
        <button type="submit" className="btn btn-success">Sign Up</button>
    </div>

  <div>
    <small className="me-2 text-muted">
      Already have an account?
    </small>
    <Link 
      to="/login" 
      className="btn btn-outline-success btn-sm"
    >
      Login
    </Link>
 

</div>
      </form>
    </div>
    </div>
    )
}