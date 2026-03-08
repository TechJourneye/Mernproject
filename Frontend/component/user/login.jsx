import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err);
  const handleSuccess = (msg) =>
    toast.success(msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.response?.data?.message || "Login failed");
    }
    setInputValue({
      username: "",
      password: "",
    });
  };

  return (
             <div className="container">
       <div className="row offset-3">
         <h2>Signup Account</h2>
     
      
      <form onSubmit={handleSubmit} className="needs-validation" >
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
        <button type="submit" className="btn btn-success">login</button>
    </div>

  <div>
    <small className="me-2 text-muted">
      Don't have an account?
    </small>
    <Link 
      to="/signup" 
      className="btn btn-outline-success btn-sm"
    >
      Signup
    </Link>
 

 </div>
      </form>
    </div>
    </div>
  );
};

export default Login;