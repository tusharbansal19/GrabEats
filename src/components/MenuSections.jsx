import React, { useRef, useState, useEffect } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import { selectDishes, selectDishesLoading, selectDishesError, fetchDishes } from '../store/dishesSlice';
import { FaSearch, FaSyncAlt, FaFire } from 'react-icons/fa';

const Menu = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const dishes = useSelector(selectDishes);
  const loading = useSelector(selectDishesLoading);
  const error = useSelector(selectDishesError);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  // Get unique categories and ratings from dishes
  const categories = Array.from(new Set(dishes.map(d => d.get_product_category?.Product_Category || 'Other')));
  const ratings = [5, 4, 3, 2, 1];

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  // Filter and suggest dishes
  const getSuggestions = () => {
    let result = dishes;
    if (selectedCategory) {
      result = result.filter(d => d.get_product_category?.Product_Category === selectedCategory);
    }
    if (selectedRating) {
      result = result.filter(d => Math.floor(d.Product_Rating) === Number(selectedRating));
    }
    if (searchTerm.trim()) {
      result = result.filter(dish => dish.Product_Name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return result;
  };

  const suggestions = getSuggestions();

  // Unified filter/search handler
  const updateFilteredDishes = (search = searchTerm, category = selectedCategory, rating = selectedRating) => {
    let result = dishes;
    if (category) {
      result = result.filter(d => d.get_product_category?.Product_Category === category);
    }
    if (rating) {
      result = result.filter(d => Math.floor(d.Product_Rating) === Number(rating));
    }
    if (search.trim()) {
      result = result.filter(dish => dish.Product_Name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredDishes(result);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSuggestionIndex(-1);
    updateFilteredDishes(value, selectedCategory, selectedRating);
  };

  const handleSearchIcon = () => {
    updateFilteredDishes(searchTerm, selectedCategory, selectedRating);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredDishes([]);
    setSuggestionIndex(-1);
    setSelectedCategory('');
    setSelectedRating('');
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    updateFilteredDishes(searchTerm, e.target.value, selectedRating);
  };

  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
    updateFilteredDishes(searchTerm, selectedCategory, e.target.value);
  };

  const handleSuggestionClick = (dish) => {
    setSearchTerm(dish.Product_Name);
    setFilteredDishes([]);
    setSuggestionIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      setSuggestionIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSuggestionIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && suggestionIndex >= 0) {
      setSearchTerm(suggestions[suggestionIndex].Product_Name);
      setFilteredDishes([]);
      setSuggestionIndex(-1);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    updateFilteredDishes(searchTerm, category, selectedRating);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Fire Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-900"></div>
        
        {/* Fire Particles */}
        <div className="fire-particles absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="fire-particle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Fire Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-orange-600/10 to-yellow-400/5 animate-pulse"></div>
        
        {/* Floating Embers */}
        <div className="embers absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="ember absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 6}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8 text-white">
        <div className="container mx-auto max-w-7xl">
          {/* Loader and error */}
          {loading && (
            <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
              <div className="relative">
                <FaFire className="text-6xl text-orange-500 animate-bounce" />
                <div className="absolute inset-0 text-6xl text-yellow-400 animate-ping opacity-30">
                  <FaFire />
                </div>
              </div>
              <span className="text-orange-400 text-xl sm:text-2xl font-bold animate-pulse">
                Firing up the kitchen...
              </span>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="bg-red-900/50 backdrop-blur-sm border border-red-500 rounded-lg p-6 text-center">
                <span className="text-red-400 text-xl sm:text-2xl font-bold">{error}</span>
              </div>
            </div>
          )}

          {/* Only show the rest if not loading and no error */}
          {!loading && !error && (
            <>
              {/* Top Bar with Back div and Search */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 mb-8 lg:mb-12">
               
                
                <div className="flex-1 w-full lg:w-auto">
                  <div className="w-full flex justify-between items-center">
                <div 
                  onClick={() => navigate('/')} 
                  className="group flex items-center gap-3 text-white hover:text-orange-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    <TiArrowBackOutline />
                  </div>
                
                </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold italic bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                      🔥  Menu
                    </h1>
                  </div>
                    <div className="flex  sm:flex-row gap-2 mb-4">
                      <select 
                        value={selectedCategory} 
                        onChange={handleCategoryChange} 
                        className="max-w-10 bg-gray-800/80 backdrop-blur-sm text-white rounded-lg px-1 py-3 font-semibold border border-orange-500/30 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all duration-300 hover:border-orange-500"
                      >
                        <option value="">All </option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      
                      <div
                        onClick={clearSearch}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-bold shadow-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:outline-none flex items-center gap-2 transform hover:scale-105 active:scale-95"
                        title="Reset Filters"
                      >
                        <FaSyncAlt className="animate-spin-slow" /> 
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full max-w-2xl">
                    {/* Filter Bar */}
                    
                    <div className="flex items-center relative">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for delicious dishes..."
                        className="w-full py-4 px-6 bg-gray-800/80 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400 border border-orange-500/20 transition-all duration-300 hover:border-orange-500/50"
                      />
                      <div 
                        onClick={handleSearchIcon} 
                        className="absolute right-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full p-3 shadow-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transform hover:scale-110 active:scale-95" 
                        title="Search"
                      >
                        <FaSearch />
                      </div>
                      {searchTerm && (
                        <div
                          onClick={clearSearch}
                          className="absolute right-16 text-orange-400 hover:text-red-400 cursor-pointer bg-gray-700/80 backdrop-blur-sm rounded-full p-2 font-bold shadow-sm hover:bg-gray-600 transition-all duration-300 transform hover:scale-110"
                        >
                          ✖
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced Suggestions Dropdown */}
                    {searchTerm && suggestions.length > 0 && (
                      <div 
                        ref={searchRef} 
                        className="absolute z-50 mt-2 w-full bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl border border-orange-500/20 overflow-hidden max-h-80 overflow-y-auto custom-scrollbar"
                      >
                        {suggestions.slice(0, 8).map((dish, idx) => {
                          const matchIdx = dish.Product_Name.toLowerCase().indexOf(searchTerm.toLowerCase());
                          return (
                            <div
                              key={dish.ID}
                              onClick={() => handleSuggestionClick(dish)}
                              className={`px-4 py-3 hover:bg-gradient-to-r hover:from-orange-600/20 hover:to-red-600/20 cursor-pointer flex items-center transition-all duration-200 border-b border-gray-700/50 last:border-b-0 ${
                                idx === suggestionIndex ? 'bg-gradient-to-r from-orange-600/30 to-red-600/30 text-white' : ''
                              }`}
                            >
                              <img 
                                src={dish.get_product_category?.Picture_Url} 
                                alt="" 
                                className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-orange-400/50" 
                              />
                              <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-2">
                                  <span className="font-medium">
                                    {matchIdx >= 0 ? (
                                      <>
                                        {dish.Product_Name.substring(0, matchIdx)}
                                        <span className="bg-orange-400 text-black font-bold rounded px-1">
                                          {dish.Product_Name.substring(matchIdx, matchIdx + searchTerm.length)}
                                        </span>
                                        {dish.Product_Name.substring(matchIdx + searchTerm.length)}
                                      </>
                                    ) : dish.Product_Name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs">
                                  <span className="text-orange-400 bg-orange-400/10 px-2 py-1 rounded">
                                    {dish.get_product_category?.Product_Category}
                                  </span>
                                  <span className="text-yellow-400 flex items-center gap-1">
                                    {dish.Product_Rating}⭐
                                  </span>
                                  <span className="text-green-400 font-semibold">
                                    ₹{dish.get_all_products?.[0]?.Product_Price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Categories Section */}
             {/* Enhanced Categories Section */}
<section className="mb-12">
  <div className="flex items-center gap-3 mb-6">
    <FaFire className="text-2xl text-orange-500" />
    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
      Hot Categories
    </h2>
  </div>
  
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/20 py-6">
    <div
      className="flex animate-seamless-scroll hover:pause-scroll"
      style={{
        animation: 'seamlessScroll 30s linear infinite',
        width: 'max-content'
      }}
      onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
      onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      onTouchStart={e => e.currentTarget.style.animationPlayState = 'paused'}
      onTouchEnd={e => e.currentTarget.style.animationPlayState = 'running'}
    >
      {/* Create seamless loop by tripling the categories */}
      {[...Array(3)].flatMap(() => categories).map((cat, index) => {
        const dish = dishes.find(d => d.get_product_category?.Product_Category === cat);
        const isSelected = selectedCategory === cat;
        return (
          <div 
            key={`${cat}-${index}`}
            onClick={() => handleCategoryClick(cat)}
            className={`flex-shrink-0 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:scale-110 mx-4 sm:mx-6 lg:mx-8 ${
              isSelected ? 'scale-105' : ''
            }`}
          >
            <div className={`relative p-1 rounded-full transition-all duration-300 ${
              isSelected ? 'bg-gradient-to-r from-orange-500 to-red-600 shadow-lg shadow-orange-500/30' : ''
            }`}>
              <img 
                src={dish?.get_product_category?.Picture_Url} 
                className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 shadow-lg transition-all duration-300 ${
                  isSelected 
                    ? 'border-white shadow-orange-500/50' 
                    : 'border-orange-400/50 group-hover:border-orange-500 group-hover:shadow-orange-500/30'
                }`}
                alt={cat}
                loading="lazy"
              />
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent group-hover:from-orange-500/20 transition-all duration-300"></div>
            </div>
            <p className={`text-center mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base font-semibold transition-all duration-300 whitespace-nowrap px-2 ${
              isSelected 
                ? 'text-orange-400 scale-105 font-bold' 
                : 'text-white group-hover:text-orange-400'
            }`}>
              {cat}
            </p>
          </div>
        );
      })}
    </div>
    
    {/* Gradient fade edges for smooth visual effect */}
    <div className="absolute left-0 top-0 w-8 sm:w-12 lg:w-16 h-full bg-gradient-to-r from-orange-900/40 to-transparent pointer-events-none z-10"></div>
    <div className="absolute right-0 top-0 w-8 sm:w-12 lg:w-16 h-full bg-gradient-to-l from-orange-900/40 to-transparent pointer-events-none z-10"></div>
  </div>
</section>

{/* Updated CSS Styles for seamless scrolling */}
<style jsx>{`
  @keyframes seamlessScroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.333%);
    }
  }
  
  .animate-seamless-scroll {
    animation: seamlessScroll 30s linear infinite;
  }
  
  .hover\\:pause-scroll:hover {
    animation-play-state: paused;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .animate-seamless-scroll {
      animation-duration: 25s;
    }
  }
  
  @media (min-width: 1024px) {
    .animate-seamless-scroll {
      animation-duration: 35s;
    }
  }
`}</style>

              {/* Enhanced Dishes Section */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <FaFire className="text-2xl text-red-500" />
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                    Sizzling Dishes
                  </h2>
                  <span className="text-gray-400 text-lg">
                    ({(filteredDishes.length ? filteredDishes : dishes).length} items)
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-2">
                  {(filteredDishes.length ? filteredDishes : dishes).map((dish, index) => (
                    <div 
                      key={dish.ID}
                      className="group transform transition-all duration-500 hover:scale-105"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                        <Card dish={dish} />
                      
                    </div>
                  ))}
                </div>
                
                {(filteredDishes.length === 0 && dishes.length === 0) && (
                  <div className="text-center py-12">
                    <FaFire className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-xl">No dishes found. The kitchen fire has gone out! 🔥</p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }

        .fire-particle {
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #ff6600, #ff0000);
          border-radius: 50%;
          animation: fireFloat linear infinite;
        }

        .ember {
          width: 2px;
          height: 2px;
          background: #ffaa00;
          border-radius: 50%;
          animation: emberFloat linear infinite;
          opacity: 0.7;
        }

        @keyframes fireFloat {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }

        @keyframes emberFloat {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
          }
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f97316, #dc2626);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ea580c, #b91c1c);
        }

        @media (max-width: 640px) {
          .fire-particle {
            width: 2px;
            height: 2px;
          }
          
          .ember {
            width: 1px;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;