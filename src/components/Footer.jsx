import React from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import "../backtoTop.css";
import { useNavigate } from "react-router-dom";

const Footer = ({scrollToTop}) => {
  const navigator =useNavigate();
  return (
    <footer className="bg-gray-900 text-white pb-12">
        <div className="w-[100%] justify-center flex mb-7 items-center  text-orange-500">
<button className="bg-black flex gap-2 justify-center px-2 rounded-b-full  " onClick={()=>scrollToTop()}>
  <div className="text">
    <span>Back</span>
    <span>to</span>
    <span>top</span>
  </div>
  <div className="clone">
    <span>Back</span>
    <span>to</span>
    <span>top</span>
  </div>
  <svg
    strokeWidth="2"
    stroke="currentColor"
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
  >
    <path
      d="M14 5l7 7m0 0l-7 7m7-7H3"
      strokeLinejoin="round"
      strokeLinecap="round"
    ></path>
  </svg>
</button>
</div>
      <div className="container mx-auto px-6 md:flex md:justify-between md:items-start">
        {/* Company Info Section */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Company Info</h2>
          <ul>
            <li className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-orange-400 mr-3" />
              <span>Akgec Ghaziabad , Delhi , India</span>
            </li>
            <li className="flex items-center mb-4">
              <FaPhoneAlt className="text-orange-400 mr-3" />
              <span>+91 9719167540</span>
            </li>
            <li className="flex items-center mb-4">
              <FaEnvelope className="text-orange-400 mr-3" />
              <span>contact@hottestfood.com</span>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold text-orange-400 mb-6">Follow Us</h2>
          <div className="flex">
            <a
              href="#"
              className="flex items-center text-white hover:text-orange-400 mr-6"
            >
              <FaInstagram className="text-orange-400 mr-3" />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center text-white hover:text-orange-400 mr-6"
            >
              <FaFacebook className="text-orange-400 mr-3" />
              Facebook
            </a>
            <a
              href="#"
              className="flex items-center text-white hover:text-orange-400"
            >
              <FaTwitter className="text-orange-400 mr-3" />
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto text-center mt-12">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Hottest Food. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
