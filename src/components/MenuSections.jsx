import React, { useRef, useState, useEffect } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Card from './Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDishes,
  selectDishesLoading,
  selectDishesError,
  fetchDishes,
  addDish,
  updateDish,
  deleteDish
} from '../store/dishesSlice';
import { FaSearch, FaSyncAlt } from 'react-icons/fa';


// Mock Data for dishes


// const categories = [
//   { id: 1, name: 'Italian', img: 'https://via.placeholder.com/100' },
//   { id: 2, name: 'Mexican', img: 'https://via.placeholder.com/100' },
//   { id: 3, name: 'Japanese', img: 'https://via.placeholder.com/100' },
//   { id: 4, name: 'Indian', img: 'https://via.placeholder.com/100' },
//   { id: 5, name: 'Chinese', img: 'https://via.placeholder.com/100' },
//   { id: 1, name: 'Italian', img: 'https://via.placeholder.com/100' },
//   { id: 2, name: 'Mexican', img: 'https://via.placeholder.com/100' },
//   { id: 3, name: 'Japanese', img: 'https://via.placeholder.com/100' },
//   { id: 4, name: 'Indian', img: 'https://via.placeholder.com/100' },
//   { id: 5, name: 'Chinese', img: 'https://via.placeholder.com/100' },
  
// ];



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

  const renderDishes = (type) => {
    const dishesToShow = filteredDishes.length ? filteredDishes.filter(dish => dish.type === type) : dishes.filter(dish => dish.type === type);
    return dishesToShow.map((dish) => (
      <div key={dish.id} className="p-4">
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <img src={dish.img} alt={dish.name} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-white text-xl font-bold mb-2">{dish.name}</h3>
            <p className="text-gray-200">Delicious {dish.name} to satisfy your cravings.</p>
          </div>
        </div>
      </div>
    ));
  };

  // Example add, update, delete handlers
  const handleAddDish = () => {
    const newDish = {
      ID: Math.floor(Math.random() * 10000),
      Product_Name: "New Dish " + Math.floor(Math.random() * 100),
      Product_Description: "A new dish added for demo.",
      Product_Rating: 4.0,
      get_product_category: {
        ID: 999,
        Product_Category: "Demo",
        Picture_Url: "https://via.placeholder.com/100"
      },
      get_all_products: [
        {
          Product_ID: Math.floor(Math.random() * 10000),
          Picture_URL: "https://via.placeholder.com/100",
          Attribute_Combination: "Default",
          Product_Price: 10.0,
          Product_Discount_Price: 8.0
        }
      ]
    };
    dispatch(addDish(newDish));
  };

  const handleUpdateDish = (dish) => {
    const updates = { ...dish, Product_Name: dish.Product_Name + " (Updated)" };
    dispatch(updateDish({ id: dish.ID, updates }));
  };

  const handleDeleteDish = (id) => {
    dispatch(deleteDish(id));
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white space-y-10">
      <div className="container mx-auto">
        {/* Loader and error */}
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-orange-400 text-2xl font-bold">Loading dishes...</span>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-red-500 text-2xl font-bold">{error}</span>
          </div>
        )}
        {/* Only show the rest if not loading and no error */}
        {!loading && !error && (
          <>
            {/* Top Bar with Back Button and Search */}
            <div className="flex items-center justify-between mb-10">
              <div onClick={() => navigate('/')} className="text-white text-[2.2rem] w-[2.3rem] hover:text-orange-400 transition">
                <TiArrowBackOutline />
              </div>
              <div className="relative flex flex-col gap-x-4 custom:flex-row w-full max-w-[1051px] ">
                <div className='italic ml-4 text-[40px]'>Menu</div>
                <div className="relative w-full">
                  {/* Filter Bar */}
                  <div className="flex gap-2 mb-2 items-center">
                    <select value={selectedCategory} onChange={handleCategoryChange} className="bg-gray-800 text-white rounded px-3 py-2 font-semibold border border-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none">
                      <option value="">All Categories</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <div
                      onClick={clearSearch}
                      className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-full font-bold shadow-sm hover:bg-orange-600 transition-all duration-200 focus:ring-2 focus:ring-orange-400 focus:outline-none flex items-center gap-2 cursor-pointer select-none"
                      title="Reset Filters"
                      tabIndex={0}
                      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && clearSearch()}
                    >
                      <FaSyncAlt /> Reset
                    </div>
                  </div>
                  <div className="flex items-center relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      onKeyDown={handleKeyDown}
                      placeholder="Search for dishes..."
                      className="w-full py-3 px-6 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 text-white placeholder-gray-400"
                    />
                    <div onClick={handleSearchIcon} className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full p-2 shadow-sm hover:bg-orange-600 transition-all duration-200 focus:ring-2 focus:ring-orange-400 focus:outline-none cursor-pointer" title="Search">
                      <FaSearch />
                    </div>
                    {searchTerm && (
                      <div
                        onClick={clearSearch}
                        className="absolute right-10 top-1/2 -translate-y-1/2 text-orange-400 cursor-pointer bg-orange-500 rounded-full p-1 px-2 font-bold shadow-sm hover:bg-orange-600 transition-all duration-200 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      >
                        ✖
                      </div>
                    )}
                  </div>
                  {/* Suggestions Dropdown */}
                  {searchTerm && suggestions.length > 0 && (
                    <div ref={searchRef} className="absolute z-40 mt-2 w-[55%] bg-gray-800 rounded-lg shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                      {suggestions.map((dish, idx) => {
                        const matchIdx = dish.Product_Name.toLowerCase().indexOf(searchTerm.toLowerCase());
                        return (
                          <div
                            key={dish.ID}
                            onClick={() => handleSuggestionClick(dish)}
                            className={`px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center ${idx === suggestionIndex ? 'bg-orange-600 text-white' : ''}`}
                          >
                            <img src={dish.get_product_category?.Picture_Url} alt="" className="w-8 h-8 rounded mr-2" />
                            <span>
                              {matchIdx >= 0 ? (
                                <>
                                  {dish.Product_Name.substring(0, matchIdx)}
                                  <span className="bg-orange-300 text-black font-bold rounded px-1">
                                    {dish.Product_Name.substring(matchIdx, matchIdx + searchTerm.length)}
                                  </span>
                                  {dish.Product_Name.substring(matchIdx + searchTerm.length)}
                                </>
                              ) : dish.Product_Name}
                            </span>
                            <span className="ml-2 text-xs text-orange-400">{dish.get_product_category?.Product_Category}</span>
                            <span className="ml-2 text-xs text-yellow-400">{dish.Product_Rating}⭐</span>
                            <span className="ml-2 text-xs text-green-400">₹{dish.get_all_products[0].Product_Price}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-left w-full">Categories</h2>
              <div className="overflow-hidden rounded-r-3xl rounded-l-3xl relative">
                <div
                  className="flex space-x-11 animate-marquee hover:pause-marquee touch-manipulation"
                  style={{
                    animation: 'marquee 30s linear infinite',
                    '--marquee-width': '100%' // for custom animation
                  }}
                  onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                  onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                  onTouchStart={e => e.currentTarget.style.animationPlayState = 'paused'}
                  onTouchEnd={e => e.currentTarget.style.animationPlayState = 'running'}
                >
                  {categories.map(cat => {
                    const dish = dishes.find(d => d.get_product_category?.Product_Category === cat);
                    return (
                      <div key={cat} className="flex-shrink-0 flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                        <img src={dish?.get_product_category?.Picture_Url} className="md:w-24 h-10 custom:w-14 custom:h-14 w-10 md:h-24 rounded-full object-cover border-4 border-x-orange-400 border-black shadow-lg group-hover:border-orange-500 transition-all duration-200" alt={cat} />
                        <p className="text-center text-white mt-2 text-sm font-semibold group-hover:text-orange-400 transition-all duration-200">{cat}</p>
                      </div>
                    );
                  })}
                </div>
                {/* Marquee keyframes (add to global CSS or tailwind config) */}
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-marquee {
                    animation: marquee 30s linear infinite;
                  }
                  .hover\:pause-marquee:hover {
                    animation-play-state: paused;
                  }
                `}</style>
              </div>
            </section>

            {/* Dishes Section */}
            <section className="mb-10 w-full flex flex-col justify-center items-center ">
              <h2 className="text-3xl font-bold mb-6 w-full text-left">All Dishes</h2>
              <div className="grid grid-cols-2 w-full items-center ml-0 custom:justify-center justify-between custom:grid-cols-3 lg:grid-cols-3 gap-x-2 custom:gap-x-4 gap-y-4 mx-auto ">
                {(filteredDishes.length ? filteredDishes : dishes).map(e => (
                  <div className="min-w-[100px]" key={e.ID}>
                    <Card dish={e} />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
     
    </div>
  );
};

export default Menu;
