import React from "react";
import "tachyons";
import Tilt from "react-parallax-tilt";
import "./FaceRecognition.css";

const FaceRecognition = ({ link, box, show_box }) => {
  return (
    <div className='center ma2 pa2'>
      <Tilt className=''>
        <img
          src={link}
          id='inputImage'
          alt=''
          style={{ height: "30rem", width: "auto" }}
          className={show_box ? "na shadow-2" : "na"}
        />
        {show_box ? (
          <div
            className='bounding-box'
            style={{
              top: box.top_row,
              right: box.right_col,
              bottom: box.bottom_row,
              left: box.left_col,
            }}
          ></div>
        ) : null}
      </Tilt>
    </div>
  );
};

export default FaceRecognition;
