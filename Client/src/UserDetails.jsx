import React, { Component, useEffect, useState } from "react";
import Admini_page from "./Admin_Component/Admini_page";
import CommentSec from "./CommentSec";
import Reportable_dease_report from "./Reportable_dease_report";
import StudentReserc from "./StudentReserc";
import "./App.css";
import HomePage from "./HomePage";
import ReportableDeasesHompage from './ReportableDeasesHompage'
import { Navigate , Outlet} from "react-router-dom";
import IRBAccount from "./IRBAccount";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [HFPhem, setHFPhem] = useState(false);
  const [SubCityPhem, setSubCityPhem] = useState(false);
  const [RegionalPhem, setRegionalPhem] = useState(false);
  const [Reserch, setReserch] = useState(false);
  const [IRB, setIRB] = useState(false);
  const [Student, setStudent] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }
        else if (data.data.userType == "RegionalPhem") {
          setRegionalPhem(true);
        }
        else if (data.data.userType == "SubCityPhem") {
          setSubCityPhem(true);
        }
        else if (data.data.userType == "Reserch") {
          setReserch(true);
        }
        else if (data.data.userType == "IRB") {
          setIRB(true);
        }
        else if (data.data.userType == "HFPhem") {
          setHFPhem(true);
        }
        else if (data.data.userType == "Student") {
          setStudent(true);
        }
        
        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./Login";
        }
      });
  }, []);

  return( admin ? <Admini_page/>:RegionalPhem ? <Reportable_dease_report/>:SubCityPhem ? <Reportable_dease_report/>:Reserch ? <CommentSec/>:IRB ? <IRBAccount/>:HFPhem ? <ReportableDeasesHompage/>:Student ? <StudentReserc/>:<HomePage userData={userData} />);
}