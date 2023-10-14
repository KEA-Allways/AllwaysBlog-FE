import React from 'react';

function BannerImage({ text, imageUrl }) {
  return (
    <img
      width="100%"
      height="500px"
      src={imageUrl}
      alt={text}
    />
  );
}

export default BannerImage;
