import React from "react";
import "tachyons";

const FaceRecognition = ({ link }) => {
  return (
    <div className='center ma2 pa2'>
      <img src={link} alt='image' style={{ height: "30rem" }} />
    </div>
  );
};

export default FaceRecognition;
