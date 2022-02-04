import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";
const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className='tc shadow-2 Tilt bg-blue'>
        <img src={brain} alt='' className='logo-img' />
      </Tilt>
    </div>
  );
};

export default Logo;
