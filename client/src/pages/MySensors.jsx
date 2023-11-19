import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MySensors = () => {
  const navItemContainerRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);

  useEffect(() => {
    const mobileMenuToggle = mobileMenuToggleRef.current;

    const handleClick = () => {
      if (navItemContainerRef.current) {
        navItemContainerRef.current.classList.toggle('show-lateral-menu');
      }
    };

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', handleClick);
    }

    return () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener('click', handleClick);
      }
    };
  }, []);

 return (
   <div className="mySensors">
    <div className="top-container">
        <div className="toggle-container">
        <h3 className="sgc">SGC</h3>
        <button className="lateral-toggle" ref={mobileMenuToggleRef} aria-label="Toggle Mobile Menu">
            <i className="fa-solid fa-bars menu-icon"></i>
        </button>
        </div>
    </div>
     <div className="sideNavbar" ref={navItemContainerRef}>
       <nav className="container">
         <div className="buttonContainer">
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
            <button className="sensorButton"> <i class="fa-solid fa-wifi"></i> sensor </button>
         </div>
       </nav>
     </div>
     <div className="sensorInfoContainer">
      <h1>Sensor</h1>
     </div>
   </div>
 );
};

export default MySensors;
