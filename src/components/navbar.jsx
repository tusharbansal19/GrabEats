import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiSplitCross } from "react-icons/gi";  
import { TfiLayoutMenuV } from "react-icons/tfi";
import { FiShoppingCart, FiUser, FiHome, FiMenu, FiInfo, FiPhone } from "react-icons/fi";
import { logoutUser, selectIsAuthenticated, selectUser } from "../store/authSlice";
import "./navbar.css";

const Navbar = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  
  // Get user email from Redux state or localStorage as fallback
  const userEmail = user?.email || localStorage.getItem("email") || "Unknown";
  const userInitial = userEmail && userEmail !== 'Unknown' ? userEmail[0].toUpperCase() : 'U';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      localStorage.clear();
      setUserOpen(false);
      setIsOpen(false);
      navigator("/login");
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      setUserOpen(false);
      setIsOpen(false);
      navigator("/login");
    }
  };

  // Enhanced scroll behavior with smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setShowNavbar(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserOpen(false);
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on navigation
  useEffect(() => {
    const closeMenusOnNavigate = () => {
      setUserOpen(false);
      setIsOpen(false);
    };
    window.addEventListener('popstate', closeMenusOnNavigate);
    return () => window.removeEventListener('popstate', closeMenusOnNavigate);
  }, []);

  // Helper for menu item click
  const handleMenuItemClick = (to) => {
    setIsOpen(false);
    setUserOpen(false);
    navigator(to);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${showNavbar ? 'navbar-visible' : 'navbar-hidden'} navbar-container`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Enhanced Logo with Fire Effect */}
        <div 
          className="logo-fire cursor-pointer flex items-center" 
          onClick={() => handleMenuItemClick("/")}
        > 
          <img 
            src="/Images/Logo.png" 
            className="w-12 h-12 rounded-full shadow-lg" 
            alt="GrabEats Logo" 
          />
        </div>

        {/* Enhanced Menu Items - Desktop */}
        <div className="hidden lg:flex space-x-2 items-center">
          <Link to="/" className="nav-button flex items-center gap-2">
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          
          <Link to="/menu" className="nav-button flex items-center gap-2">
            <FiMenu className="text-lg" />
            <span>Menu</span>
          </Link>
          
          <Link to="/about" className="nav-button flex items-center gap-2">
            <FiInfo className="text-lg" />
            <span>About</span>
          </Link>
          
          <Link to="/contact" className="nav-button flex items-center gap-2">
            <FiPhone className="text-lg" />
            <span>Contact</span>
          </Link>
          
          
          
          <Link to="/cart" className="nav-button flex items-center gap-2 relative">
            <FiShoppingCart className="text-lg" />
            <span>Cart</span>
          </Link>

          {/* Enhanced User Avatar with Fire Effect */}
          <div className="relative flex flex-col items-center ml-10" ref={dropdownRef}>
            <div 
              onClick={() => setUserOpen(!userOpen)} 
              className="
              "
            >
              <div className=" ml-10 rounded-full h-12 w-12 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-lg font-bold shadow-lg">
                {userInitial}
              </div>
              <p className="text-xs text-orange-400 mt-1 opacity-80">
                {userEmail.length > 15 ? userEmail.substring(0, 15) + '...' : userEmail}
              </p>
            </div>

            {/* Enhanced Dropdown Menu */}
            {userOpen && (
              <div className="absolute top-16 right-0 dropdown-menu rounded-xl w-48 text-white fade-in-up">
                <ul className="flex flex-col space-y-1 p-3">
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer" 
                    onClick={() => handleMenuItemClick("/dashboard")}
                  >
                    <FiUser className="text-lg" />
                    Dashboard
                  </li>
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer" 
                    onClick={handleLogout}
                  >
                    <GiSplitCross className="text-lg" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile User Avatar */}
          <div className="relative flex flex-col items-center" ref={dropdownRef}>
            <div 
              onClick={() => setUserOpen(!userOpen)} 
              className="user-avatar flex flex-col items-center cursor-pointer"
            >
              <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-bold shadow-lg">
                {userInitial}
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {userOpen && (
              <div className="absolute top-12 right-0 dropdown-menu rounded-xl w-40 text-white fade-in-up">
                <ul className="flex flex-col space-y-1 p-2">
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer text-sm" 
                    onClick={() => handleMenuItemClick("/dashboard")}
                  >
                    <FiUser className="text-base" />
                    Dashboard
                  </li>
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer text-sm" 
                    onClick={handleLogout}
                  >
                    <GiSplitCross className="text-base" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Enhanced Hamburger Menu */}
          <button 
            onClick={toggleMenu} 
            className="hamburger-icon focus:outline-none"
          >
            {isOpen ? <GiSplitCross size={24} /> : <TfiLayoutMenuV size={24} />}
          </button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mobile-menu fade-in-up">
          <div className="flex flex-col space-y-1 p-4">
            <span 
              onClick={() => handleMenuItemClick("/")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiHome className="text-lg" />
              Home
            </span>
            <span 
              onClick={() => handleMenuItemClick("/menu")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiMenu className="text-lg" />
              Menu
            </span>
            <span 
              onClick={() => handleMenuItemClick("/about")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiInfo className="text-lg" />
              About Us
            </span>
            <span 
              onClick={() => handleMenuItemClick("/contact")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiPhone className="text-lg" />
              Contact
            </span>
            <span 
              onClick={() => handleMenuItemClick("/menu")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <div className="order-button text-sm">
                <span>Order Now</span>
              </div>
            </span>
            <span 
              onClick={() => handleMenuItemClick("/cart")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiShoppingCart className="text-lg" />
              Cart
            </span>
            <span 
              onClick={() => handleMenuItemClick("/dashboard")} 
              className="mobile-menu-item flex items-center gap-3 cursor-pointer"
            >
              <FiUser className="text-lg" />
              Dashboard
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;