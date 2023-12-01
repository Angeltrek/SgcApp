import React from "react";

import '../App.css';

const Banner = ({ title, subtitle, imageUrl, imgAlt }) => {
  return (
    <div className="banner">
      <div className="banner-info">
        <h1 className="sgc-title white">{title}</h1>
        <h5 className="subtitle">{subtitle}</h5>
      </div>
      <img src={imageUrl} alt={imgAlt} />
    </div>
  );
};

export default Banner;
