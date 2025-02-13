import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import GallaryNavbar from "./GallaryNavbar";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

function Gallary() {
    const [allImage, setAllImage] = useState(null);
    useEffect(() => {
        getImage();
      }, []);
      const getImage = async () => {
        const result = await axios.get("http://localhost:3000/get-image")
        console.log(result)
        setAllImage(result.data.data)
      };
    
  return (
   <><GallaryNavbar /><div className=" p-2 mb-3  bg-white">
          <h4 className='border border-secondary bgcoll text-white text-center rounded '> Image Gallary</h4>

          <div className=" w-100 bg-white rounded  border border-secondary p-2 mb-2">
              {allImage == null
                  ? ""
                  : allImage.map((data) => {
                      return (
                          <img
                              src={(`./src/images/${data.pdf}`)}
                              className="w-50 img-thumbnail img-responsive mb-3" />
                      );
                  })}
             
          </div>

      </div><div></div></>

  )
}

export default Gallary
