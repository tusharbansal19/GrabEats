import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GiSplitCross } from "react-icons/gi";  
import { TfiLayoutMenuV } from "react-icons/tfi";
import { FiShoppingCart, FiUser, FiHome, FiMenu, FiInfo, FiPhone, FiLogOut, FiSettings } from "react-icons/fi";
import { logoutUser, selectIsAuthenticated, selectUser } from "../store/authSlice";
import "./navbar.css";

const Navbar = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileUserOpen, setMobileUserOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  
  // Get user email from Redux state or localStorage as fallback
  const userEmail = user?.email || localStorage.getItem("email") || "Unknown";
  const userInitial = userEmail && userEmail !== 'Unknown' ? userEmail[0].toUpperCase() : 'U';

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      localStorage.clear();
      setUserOpen(false);
      setMobileUserOpen(false);
      setIsOpen(false);
      navigator("/login");
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      setUserOpen(false);
      setMobileUserOpen(false);
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
      // Close desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserOpen(false);
      }
      
      // Close mobile dropdown
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileUserOpen(false);
      }
      
      // Close mobile menu
      if (!event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-icon')) {
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
      setMobileUserOpen(false);
      setIsOpen(false);
    };
    window.addEventListener('popstate', closeMenusOnNavigate);
    return () => window.removeEventListener('popstate', closeMenusOnNavigate);
  }, []);

  // Close menus when location changes
  useEffect(() => {
    setUserOpen(false);
    setMobileUserOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

  const handleDashboardClick = () => {
    console.log('Dashboard clicked');
    setUserOpen(false);
    setMobileUserOpen(false);
    navigator("/dashboard");
  };

  const handleLogoutClick = () => {
    console.log('Logout clicked');
    handleLogout();
  };

  const handleMobileUserToggle = () => {
    setMobileUserOpen(!mobileUserOpen);
    // Close mobile menu when opening user dropdown
    if (!mobileUserOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${showNavbar ? 'navbar-visible' : 'navbar-hidden'} navbar-container`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Enhanced Logo with Fire Effect */}
        <Link to="/" className="logo-fire cursor-pointer flex items-center"> 
          <img 
            src="/Images/Logo.png" 
            className="w-12 h-12 rounded-full shadow-lg" 
            alt="GrabEats Logo" 
          />
        </Link>

        {/* Enhanced Menu Items - Desktop */}
        <div className="hidden lg:flex space-x-2 items-center">
          <Link to="/" className={`nav-button flex items-center gap-2 ${location.pathname === '/' ? 'active' : ''}`}>
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          
          <Link to="/menu" className={`nav-button flex items-center gap-2 ${location.pathname === '/menu' ? 'active' : ''}`}>
            <FiMenu className="text-lg" />
            <span>Menu</span>
          </Link>
          
          <Link to="/about" className={`nav-button flex items-center gap-2 ${location.pathname === '/about' ? 'active' : ''}`}>
            <FiInfo className="text-lg" />
            <span>About</span>
          </Link>
          
          <Link to="/contact" className={`nav-button flex items-center gap-2 ${location.pathname === '/contact' ? 'active' : ''}`}>
            <FiPhone className="text-lg" />
            <span>Contact</span>
          </Link>
          
          <Link to="/menu" className="order-button">
            <span>Order Now</span>
          </Link>
          
          <Link to="/cart" className={`nav-button flex items-center gap-2 relative ${location.pathname === '/cart' ? 'active' : ''}`}>
            <FiShoppingCart className="text-lg" />
            <span>Cart</span>
          </Link>

          {/* Enhanced User Avatar with Fire Effect */}
          <div className="relative flex flex-col items-center ml-4" ref={dropdownRef}>
            <div 
              onClick={() => setUserOpen(!userOpen)} 
              className="user-avatar flex flex-col items-center cursor-pointer group"
            >
              <div className="rounded-full h-12 w-12 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-200">
                {userInitial}
              </div>
              <p className="text-xs text-orange-400 mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                {userEmail.length > 15 ? userEmail.substring(0, 15) + '...' : userEmail}
              </p>
            </div>

            {/* Enhanced Dropdown Menu */}
            {userOpen && (
              <div className="absolute top-16 right-0 dropdown-menu rounded-xl w-56 text-white fade-in-up z-50">
                <div className="p-4 border-b border-orange-400/20">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-bold">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{userEmail}</p>
                      <p className="text-xs text-orange-400">Welcome back!</p>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col space-y-1 p-3">
                  <li 
                    className="dropdown-item flex items-center gap-3 cursor-pointer" 
                    onClick={handleDashboardClick}
                  >
                    <FiUser className="text-lg" />
                    <span>Dashboard</span>
                  </li>
                  <li 
                    className="dropdown-item flex items-center gap-3 cursor-pointer" 
                    onClick={handleLogoutClick}
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Mobile User Avatar */}
          <div className="relative flex flex-col items-center" ref={mobileDropdownRef}>
            <div 
              onClick={handleMobileUserToggle}
              className="user-avatar flex flex-col items-center cursor-pointer group"
            >
              <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-200">
                {userInitial}
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileUserOpen && (
              <div className="absolute top-12 right-0 dropdown-menu rounded-xl w-48 text-white fade-in-up z-50">
                <div className="p-3 border-b border-orange-400/20">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-orange-400 bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xs font-bold">
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{userEmail.length > 15 ? userEmail.substring(0, 15) + '...' : userEmail}</p>
                    </div>
                  </div>
                </div>
                <ul className="flex flex-col space-y-1 p-2">
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer text-sm" 
                    onClick={handleDashboardClick}
                  >
                    <FiUser className="text-base" />
                    <span>Dashboard</span>
                  </li>
                  <li 
                    className="dropdown-item flex items-center gap-2 cursor-pointer text-sm" 
                    onClick={handleLogoutClick}
                  >
                    <FiLogOut className="text-base" />
                    <span>Logout</span>
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
            <Link to="/" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/' ? 'active' : ''}`}>
              <FiHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link to="/menu" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/menu' ? 'active' : ''}`}>
              <FiMenu className="text-lg" />
              <span>Menu</span>
            </Link>
            <Link to="/about" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/about' ? 'active' : ''}`}>
              <FiInfo className="text-lg" />
              <span>About Us</span>
            </Link>
            <Link to="/contact" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/contact' ? 'active' : ''}`}>
              <FiPhone className="text-lg" />
              <span>Contact</span>
            </Link>
            <Link to="/menu" className="mobile-menu-item flex items-center gap-3 cursor-pointer">
              <div className="order-button text-sm">
                <span>Order Now</span>
              </div>
            </Link>
            <Link to="/cart" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/cart' ? 'active' : ''}`}>
              <FiShoppingCart className="text-lg" />
              <span>Cart</span>
            </Link>
            <Link to="/dashboard" className={`mobile-menu-item flex items-center gap-3 cursor-pointer ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              <FiUser className="text-lg" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;