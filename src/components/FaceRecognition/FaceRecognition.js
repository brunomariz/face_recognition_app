import React from "react";
import "tachyons";
import Tilt from "react-parallax-tilt";

const FaceRecognition = ({ link }) => {
  return (
    <div className='center ma2 pa2'>
      <Tilt>
        <img
          src={link}
          alt=''
          style={{ height: "30rem" }}
          className='shadow-2'
        />
      </Tilt>
    </div>
  );
};

export default FaceRecognition;
