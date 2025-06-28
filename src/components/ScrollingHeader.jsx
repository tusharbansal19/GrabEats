import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaSearch, FaBars } from 'react-icons/fa';

const ScrollingHeader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const headerStyle = {
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black to-orange-950 shadow-lg border-b border-orange-500"
      style={headerStyle}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img 
              src="/Images/Logo.png" 
              alt="GrabEats" 
              className="h-8 w-8 mr-2"
            />
            <span className="text-xl font-bold text-orange-400">GrabEats</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate('/')}
              className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center"
            >
              <FaHome className="mr-1" />
              Home
            </button>
            
            <button 
              onClick={() => navigate('/menu')}
              className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center"
            >
              <FaSearch className="mr-1" />
              Menu
            </button>
            
            <button 
              onClick={() => navigate('/cart')}
              className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center relative"
            >
              <FaShoppingCart className="mr-1" />
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            <button 
              onClick={() => navigate('/profile')}
              className="text-white hover:text-orange-400 transition-colors duration-200 flex items-center"
            >
              <FaUser className="mr-1" />
              Profile
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-orange-400 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="text-xl" />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-orange-500">
            <div className="px-4 py-2 space-y-2">
              <button 
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-white hover:text-orange-400 transition-colors duration-200 flex items-center py-2"
              >
                <FaHome className="mr-2" />
                Home
              </button>
              
              <button 
                onClick={() => {
                  navigate('/menu');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-white hover:text-orange-400 transition-colors duration-200 flex items-center py-2"
              >
                <FaSearch className="mr-2" />
                Menu
              </button>
              
              <button 
                onClick={() => {
                  navigate('/cart');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-white hover:text-orange-400 transition-colors duration-200 flex items-center py-2"
              >
                <FaShoppingCart className="mr-2" />
                Cart
              </button>
              
              <button 
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-white hover:text-orange-400 transition-colors duration-200 flex items-center py-2"
              >
                <FaUser className="mr-2" />
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ScrollingHeader; 