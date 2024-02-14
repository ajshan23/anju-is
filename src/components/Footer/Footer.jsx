import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-32 bg-black flex  text-white" id="contact">
      <div className="flex flex-row w-full justify-between  px-20">
        <div className="flex flex-row items-center">
          Connect with Us:&nbsp;&nbsp;
          <FaFacebook />
          &nbsp;
          <FaInstagram />
          &nbsp;
          <FaTwitter />
        </div>
        <div className="flex items-center justify-center">
          <div>By Anju I S</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
