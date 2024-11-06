import React, { useRef, useState } from 'react';
import { TiArrowBackOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Card from './Card';
import { useDish } from '../Context/DishProvider';


// Mock Data for dishes


const categories = [
  { id: 1, name: 'Italian', img: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Mexican', img: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Japanese', img: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Indian', img: 'https://via.placeholder.com/100' },
  { id: 5, name: 'Chinese', img: 'https://via.placeholder.com/100' },
  { id: 1, name: 'Italian', img: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Mexican', img: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Japanese', img: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Indian', img: 'https://via.placeholder.com/100' },
  { id: 5, name: 'Chinese', img: 'https://via.placeholder.com/100' },
  
];



const Menu = () => {
  const navigate = useNavigate();
  const searchRef=useRef("null");
  const {dishes}=useDish();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter dishes based on search term
    if (value.trim()) {
      setFilteredDishes(dishes.filter(dish => dish.name.toLowerCase().includes(value.toLowerCase())));
    } else {
      setFilteredDishes([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredDishes([]);
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

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-black via-gray-900 to-orange-900 text-white space-y-10">
      <div className="container mx-auto">
        {/* Top Bar with Back Button and Search */}
        <div className="flex items-center  justify-between  mb-10">
          <div onClick={() => navigate('/')} className="text-white text-[2.2rem] w-[2.3rem] hover:text-orange-400 transition">
          <TiArrowBackOutline />
          </div>

          <div className="relative flex flex-col gap-x-4 custom:flex-row w-full max-w-[1051px] ">
            <div className=' italic ml-4 text-[40px]'>Menu</div>
            <div className=" relative w-full">

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for dishes..."
              className="w-full py-3 px-6 bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 text-white placeholder-gray-400"
              />
            {searchTerm && (
              <div
              onClick={clearSearch}
              className="absolute right-[2rem] top-[1rem] text-orange-400 "
              >
                ✖
              </div>
            )}
            </div>
            {filteredDishes.length > 0 && (
              <div  ref={searchRef} className="absolute z-40  mt-2 w-[55%] bg-gray-800 rounded-lg shadow-lg overflow-hidden max-h-40 overflow-y-auto">
                {filteredDishes.map((dish) => (
                  <div onClick={()=>{
                 
                    setSearchTerm(dish.name);
                    setFilteredDishes([]);
                  }}
                    key={dish.id}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {dish.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-left w-full ">Categories</h2>
          <div className="overflow-hidden rounded-r-3xl rounded-l-3xl">
            <div className="flex space-x-11  animate-marquee  ">
              {categories.map((category) => (
                
                <div key={category.id} className="flex-shrink-0  ">
                  <img src="./public\Images\incir9023-scaled.jpg"  className="md:w-24 h-10  custom:w-14 custom:h-14 w-10 md:h-24 rounded-full object-cover border-4  animate-T-rotate border-x-orange-400 border-black " />
                  <p className="text-center text-white">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dishes Section */}
        <section className="mb-10  w-full flex flex-col justify-center items-center ">
          <h2 className="text-3xl  font-bold mb-6 w-full text-left">All Dishes</h2>
          <div className="grid  grid-cols-2 w-full items-center   ml-0 custom:justify-center justify-between     custom:grid-cols-3 lg:grid-cols-4   gap-x-2 custom:gap-x-4 gap-y-4 mx-auto ">
            {dishes.map(e =>{

              
           
                return <div className="min-w-[100px]">


              <Card dish={e} />
            
         </div>
  
} 
)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Menu;
