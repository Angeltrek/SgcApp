import React from 'react';

import '../App.css';

export default function TypeTwoContent({ imageUrl, title, textContent, green, reverse }) {
  return (
    <div
      className={`content-container ${reverse ? 'reverse' : ''} ${
        green ? 'green-container' : ''
      }`}
    >
      <div className="content content-left">
        <h2 className="title">{title}</h2>
        <p className="text">{textContent}</p>
      </div>

      <div className="content image-container">
        <img src={imageUrl} alt="" className="vertical-img" />
      </div>
    </div>
  );
};
