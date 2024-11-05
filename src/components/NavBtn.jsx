import React from "react";

const Button = ({name}) => {
  return (
    <div class="relative inline-block group">
      {/* Menu Button with Gradient Text */}
      <div class="bg-gradient-to-b from-orange-400 to-black bg-clip-text text-transparent font-bold py-2 px-4 rounded transition-all ease-linear hover:border-b-orange-600 hover:border-b-2 focus:outline-none">
{name}
      </div>

      {/* Hover Div */}
      <div class="absolute bottom-[-100px] bg-gradient-to-r from-orange-400 to-black  left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm font-semibold py-7 px-7 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {name}
      </div>

      {/* Hover Effect on Entire Button */}

    </div>
  );
};

export default Button;
