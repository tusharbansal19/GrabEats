import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./NavBtn";
import { GiSplitCross } from "react-icons/gi";  

import { TfiLayoutMenuV } from "react-icons/tfi";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const navigator= useNavigate()
  const {logout,isAuthenticated}=useAuth();
  const menuRef2=useRef(1);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(1);
  const dropdownRef = useRef(null);
  const [menustate,setMenustate]=useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [userOpen, setUserOpen] = useState(false);

  const handleClickOutside = (event) => {
    // console.log(menustate)
  let a=0,b=0;
    if (!menustate&&menuRef2.current && !menuRef2.current.contains(event.target)) {
      // console.log(menuRef.current)
      // console.log("logs2")
      // setUserOpen(false);
      a=1;
      
    }
    if (!menustate&&menuRef.current && !menuRef.current.contains(event.target)) {
  b=1
    }
    if(a==1&b==1){
      // console.log("logs2")
      setUserOpen(false);
    }
  
    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
    setMenustate(null)
  };

  // Attach the event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
const handleLogout = () => {
  console.log("user")
};


if(!isAuthenticated){
  return <></>
}
  return (
    <nav className="bg-opacity-20 backdrop-filter relative backdrop-blur-lg bg-gradient-to-r from-black to-gray-800 shadow-lg  w-full z-50">
      <div className="container mx-auto px-4 py-4 flex w-full   justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-orange-500" onClick={()=>{navigator("/")}}>
          <img src="/Images/Logo.png" className="max-w-[100px] rounded-3xl" alt="" />
        </div>

        {/* Menu Items - Desktop */}
        <div className="hidden md:flex space-x-6">
          <Link to="/menu">
            <Button name={"Menu"} />
          </Link>
        
          <Link to="/about" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out">
          <Button name={"about"} />          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out">
          <Button name={"contact"} />          </Link>
          <Link to="/menu" className="px-4 py-2 bg-orange-500 hover:bg-orange-400 text-black rounded-full transition duration-300 ease-in-out">
          <Button name={"order"} />          </Link>

          <Link to="/cart" className="text-gray-300 hover:text-orange-400 transition duration-300 ease-in-out">
          <Button name={"Cart"} />          </Link>
        <div className="relative flex flex-col items-center">
          {/* Clickable Image/Avatar */}
          <div onClick={() => setUserOpen(!userOpen)} className="flex flex-col items-center justify-centercursor-pointer">
            <img
              src="" // Replace with user image source
              className="rounded-full h-[40px] w-[40px] text-[30px] justify-center flex items-center text-center   border-2 border-orange-400   object-cover"
              alt={localStorage.getItem("email")[0]}
              />
            <p className="text-[0.6rem] text-orange-400">({localStorage.getItem("email")})</p>
          </div>

          {/* Dropdown Menu */}
          {userOpen && (
            <div ref={menuRef2} onClick={(event)=>setMenustate(event)} className="absolute top-14 right-0 bg-gradient-to-br from-[#001F3F] z-50 to-[#000000] shadow-lg rounded-lg w-[150px] text-white">
              <ul className="flex flex-col space-y-2 p-2" onClick={()=>{
                // console.log("it not so good")
              }}>
                <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={() =>navigator("/dashboard")}>
                Dash board
                </li>
                <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={()=>{logout();  navigator("/login")}}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

          </div>
        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden flex items-center  ">
        <div className="relative flex flex-col items-center">
          {/* Clickable Image/Avatar */}
          <div onClick={() => {setUserOpen(!userOpen); }
          } className="flex flex-col items-center justify-centercursor-pointer">
            <img
              src="" // Replace with user image source
              className="rounded-full h-[40px] w-[40px] text-[30px] justify-center flex items-center text-center   border-2 border-orange-400   object-cover"
              alt={localStorage.getItem("email")[0]}
              />
            <p className="text-[0.6rem] text-orange-400">({localStorage.getItem("email")})</p>
          </div>

          {/* Dropdown Menu */}
          {userOpen && (
            <div  onClick={(event)=>setMenustate(event)} ref={menuRef} className="   absolute top-14 right-0 bg-gradient-to-br from-[#001F3F] to-[#000000] shadow-lg rounded-lg w-[150px] text-white z-10">
              <ul className="flex flex-col space-y-2 p-2">
                <li className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" onClick={() => navigator("/dashboard")}>
                  User Dashboard
                </li>
                <div onClick={()=>{logout();navigator("/login")}} className="hover:bg-gray-700 rounded-lg p-2 cursor-pointer" >
                  Logout
                </div>
              </ul>
            </div>
          )}
        </div>


        
          <button onClick={toggleMenu} className="focus:outline-none w-[20px]">
           {isOpen ?<GiSplitCross />:<TfiLayoutMenuV />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={dropdownRef} className="md:hidden bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gradient-to-b from-black to-gray-800">
          <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
            Home
          </Link>
          <Link to="/menu" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
            Menu
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
            About Us
          </Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
            Contact
          </Link>
          <Link to="/menu" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
            Order Now
          </Link>
          <Link to="/dashboard" className="block px-4 py-2 text-gray-300 hover:bg-orange-500 hover:text-black transition duration-300 ease-in-out">
           Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
