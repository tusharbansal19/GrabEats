import React, { useState, useEffect } from 'react';
import "../App.css"
// Sample images array
const images = [
  "/images/incir9023-scaled.jpg",
  "/Images/1.2.jpg",  "/Images/1.1.jpg",
  "/Images/1.3.jpg", "/Images/1.4.jpg", "/Images/1.5.jpg",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const nextImage = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(false);
    }, 500); // Delay to match the animation duration
  };



  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextImage, 8000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="md:w-1/2 max-w-[250px]  max-h-[250px] bg-[url('/public/Images/2.0.jpg')] bg-cover bg-center  w-full lg:max-w-full lg:max-h-full md:max-w-[500px] md:max-h-[500px]  overflow-hidden mt-12 md:mt-0 relative p-4 ">
      <img
        className={`h-auto w-full max-w-[250px] max-h-[250px] lg:max-w-full lg:max-h-full md:max-w-[500px] md:max-h-[500px]  animate-upDn object-cover rounded-full shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20 transition-opacity duration-500 ease-in-out ${fade ? 'opacity-0' : 'opacity-100'}`}
        src={images[currentIndex]}
        alt="Featured Dish"
      />
 

    </div>
  );
};

// Example usage of ImageCarousel component
export default ImageCarousel;
