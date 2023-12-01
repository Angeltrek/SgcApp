import React from 'react';

import '../App.css';

export default function TypeOneContent({
  imageUrlOne,
  imageUrlTwo,
  firstTitle,
  secondTitle,
  textContentOne,
  textContentTwo,
  contentLeft,
  roundedThumbnail,
}) {
  return (
    <div className={`content-container ${contentLeft ? 'content-left' : ''}`}>
      <div className="content">
        <img
          className={`${roundedThumbnail ? 'rounded-thumbnail' : 'thumbnail'}`}
          src={imageUrlOne}
        />
        <h2 className="title">{firstTitle}</h2>
        <p className="text">{textContentTwo}</p>
      </div>

      <div className={`content ${contentLeft ? 'content-left' : ''}`}>
        <img
          className={`${roundedThumbnail ? 'rounded-thumbnail' : 'thumbnail'}`}
          src={imageUrlTwo}
        />
        <h2 className="title">{secondTitle}</h2>
        <p className="text">{textContentOne}</p>
      </div>
    </div>
  );
};
