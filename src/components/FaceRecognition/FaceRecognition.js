import React from "react";
import "tachyons";
import Tilt from "react-parallax-tilt";

const FaceRecognition = ({ link }) => {
  return (
    <div className='center ma2 pa2'>
      <Tilt className=''>
        <img
          src={link}
          alt=''
          style={{ height: "30rem", width: "auto" }}
          className='na shadow-2'
        />
      </Tilt>
    </div>
  );
};

export default FaceRecognition;
