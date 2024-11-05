import React, { useState } from "react";
import "../App.css";
import Explore from "./Explore";
import Footer from "./Footer";
import Navbar from "./navbar";
import PremiminCard from "./Premimumcard";
import ImageCarousel from "./MainCrousel";
import { useDish } from "../Context/DishProvider";
const Home = () => {
  const categories=[1,2,3,4,5,1,2,3,4,5];
  const {dishes}=useDish();
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };
 

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      
      {/* Hero Section */}
      {/* <Navbar/> */}
    
      {/* <ThemedNavbar/> */}
      {/* <Navbar/> */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-70"></div>
        <div className="relative z-10 container mx-auto px-4 py-2 md:py-2 flex flex-col md:flex-row justify-between items-center">
          {/* Left Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-orange-500">
              Discover the Hottest Food
            </h1>
            <p className="text-xl mt-4 text-gray-300">
              Experience the most delicious and trending dishes, curated just
              for you!
            </p>
          <Explore />
          </div>

          {/* Right Image Section */}
<ImageCarousel/>
       
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-12">
          Our Signature Dishes
        </h2>
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
          <div className="overflow-hidden py-5">
            <div className="flex space-x-11  animate-marquee">
              {dishes.map((dish) => (
                
              <PremiminCard dish={dish}/>
              ))}
            </div>
          </div>
        </section>
        
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Hottest Food. All rights
            reserved.
          </p>
          <div className="mt-4">
            <a
              href="/"
              className="text-orange-400 hover:text-orange-300 mx-2 transition duration-300 ease-in-out"
            >
              Instagram
            </a>
            <a
              href="/"
              className="text-orange-400 hover:text-orange-300 mx-2 transition duration-300 ease-in-out"
            >
              Facebook
            </a>
            <a
              href="/"
              className="text-orange-400 hover:text-orange-300 mx-2 transition duration-300 ease-in-out"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
      <Footer scrollToTop={scrollToTop}/>
    </div>
  );
};

export default Home;
