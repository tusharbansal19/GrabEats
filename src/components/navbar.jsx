import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./NavBtn";
import { GiSplitCross } from "react-icons/gi";  
import { TfiLayoutMenuV } from "react-icons/tfi";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigator = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userEmail = localStorage.getItem("email") || "Unknown";

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigator("/login");
  };

  // Handle clicks outside to close menus
  const handleClickOutside = (event) => {
    // Add your outside click logic here
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-opacity-20 backdrop-filter relative backdrop-blur-lg bg-gradient-to-r from-black to-gray-800 shadow-lg w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500" onClick={() => navigator("/")}>
          <img src="/Images/Logo.png" className="max-w-[100px] rounded-3xl" alt="" />
        </div>

        {/* Menu Items - Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/menu"><Button name={"Menu"} /></Link>
          <Link to="/about" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"><Button name={"about"} /></Link>
          <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"><Button name={"contact"} /></Link>
          <Link to="/menu" className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black rounded-full transition duration-300 ease-in-out"><Button name={"order"} /></Link>
          <Link to="/cart" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out"><Button name={"Cart"} /></Link>

          {/* User Avatar */}
          <div className="relative flex flex-col items-center">
            <div onClick={() => setUserOpen(!userOpen)} className="flex flex-col items-center cursor-pointer">
              <img src="" className="rounded-full h-[40px] w-[40px] border-2 border-orange-400 object-cover" alt={userEmail} />
              <p className="text-[0.6rem] text-orange-400">({userEmail})</p>
            </div>

            {/* Dropdown Menu */}
            {userOpen && (
              <div className="absolute top-14 right-0 bg-gradient-to-br from-[#001F3F] z-50 to-[#000000] shadow-lg rounded-lg w-[150px] text-white">
                <ul className="flex flex-col space-y-2 p-2">
                  <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={() => navigator("/dashboard")}>Dashboard</li>
                  <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden flex items-center">
          <div className="relative flex flex-col items-center">
            <div onClick={() => setUserOpen(!userOpen)} className="flex flex-col items-center cursor-pointer">
              <img src="" className="rounded-full h-[40px] w-[40px] border-2 border-orange-400 object-cover" alt={"U"} />
              <p className="text-[0.6rem] text-orange-400">({userEmail})</p>
            </div>

            {/* Dropdown Menu */}
            {userOpen && (
              <div className="absolute top-14 right-0 bg-gradient-to-br from-[#001F3F] to-[#000000] shadow-lg rounded-lg w-[150px] text-white">
                <ul className="flex flex-col space-y-2 p-2">
                  <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={() => navigator("/dashboard")}>User Dashboard</li>
                  <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="focus:outline-none w-[20px] text-white ">
            {isOpen ? <GiSplitCross /> : <TfiLayoutMenuV />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gradient-to-b from-black to-gray-800">
          <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Home</Link>
          <Link to="/menu" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Menu</Link>
          <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">About Us</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Contact</Link>
          <Link to="/menu" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Order Now</Link>
          <Link to="/Cart" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Cart</Link>
          <Link to="/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
