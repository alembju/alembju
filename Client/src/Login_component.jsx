import React, { Component, useState } from "react";
import { useRef,  useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlClick = () =>{
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Email or password incorrect!",
      footer: '<a href="#">Please write the correct Email and password</a>'
    });
  }
 

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:3000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, handlClick());
        if (data.status == "ok") {
          console.log(data.userType);
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("userType", data.userType);
          window.localStorage.setItem("loggedIn", true);
          
          if (data.userType == "Admin") {
            
            return (window.location.href = "./Adminipage");

          }else if (data.userType == "RegionalPhem") {
            
            return (window.location.href = "./Adminipage");
          }
          else if (data.userType == "Reserch") {
            
            return (window.location.href = "./CommentSec");
          }
          else if (data.userType == "HFPhem") {
            
            return (window.location.href = "./ReportableDeasesHompage");
          }
          else if (data.userType == "IRB") {
            
            return (window.location.href = "./IRBUpload");
          }
          else {
            window.location.href = "./userDetails";
          }
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          
         
        </form>
      </div>
    </div>
  );
  return <UserHome userData={userData} />;
}