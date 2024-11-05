import React, { useState } from 'react';
import { FaTrash, FaShippingFast, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../Context/CartProvider';

// Updated sample dishes array with manipulated variable names
const dishesSample = [
  {
    ID: 1, // Renamed 'id' to 'ID'
    Product_Name: "Spaghetti Carbonara", // Renamed 'name' to 'Product_Name'
    Product_Description: "Classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.", // Renamed 'description' to 'Product_Description'
    Product_Price: 12.99, // Renamed 'price' to 'Product_Price'
    quantity: 2, // Keeping 'quantity' as it aligns with the quantity concept
    Product_Rating: 4.5, // Renamed 'rating' to 'Product_Rating'
    Product_Discount_Price: 2, // Renamed 'discount' to 'Product_Discount_Price'
    image: "https://via.placeholder.com/150", // Keeping 'image' as it is
    Attribute_Combination: "Large, Extra Bacon" // Added 'Attribute_Combination' field
  },
  {
    ID: 2, // Renamed 'id' to 'ID'
    Product_Name: "Margherita Pizza", // Renamed 'name' to 'Product_Name'
    Product_Description: "Delicious pizza topped with fresh mozzarella, tomatoes, and basil.", // Renamed 'description' to 'Product_Description'
    Product_Price: 10.49, // Renamed 'price' to 'Product_Price'
    quantity: 1, // Keeping 'quantity'
    Product_Rating: 4.8, // Renamed 'rating' to 'Product_Rating'
    Product_Discount_Price: 1.5, // Renamed 'discount' to 'Product_Discount_Price'
    image: "https://via.placeholder.com/150", // Keeping 'image'
    Attribute_Combination: "Small, No Onions" // Added 'Attribute_Combination' field
  },
];

const MyCart = ({ dishes = dishesSample, onRemove }) => {
  const { state, } = useCart();
  const {dispatch}=useCart();
  dishes=state.cart;
  
  const [quantities, setQuantities] = useState(dishes.map(dish => dish.quantity));

  const getTotalPrice = () => {
    return dishes.reduce((total, dish, index) => total + dish.Product_Price * quantities[index], 0).toFixed(2);
  };

  const getTax = () => {
    return (getTotalPrice() * 0.1).toFixed(2);
  };

  const getFinalPrice = () => {
    return (parseFloat(getTotalPrice()) + parseFloat(getTax())).toFixed(2);
  };

  const handleQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Number(value);
    setQuantities(newQuantities);
  };

  const handleConfirmOrder = () => {
    alert("Your order has been confirmed!"); // Replace this with actual confirm functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 p-6 md:p-10 text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Cart Header */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
          My Cart
        </h1>

        {/* Cart Items Section */}
        <div className="space-y-6">
          {dishes.length > 0 ? (
            dishes.map((dish, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row justify-between items-center bg-gray-800 max-w-[710px] p-4 rounded-lg shadow-lg space-y-4 md:space-y-0 md:space-x-6"
              >
                {/* Dish Image and Details */}
                <div className="flex items-center space-x-4">
                  <img
                    src={dish.image}
                    alt={dish.Product_Name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">{dish.Product_Name}</h2>
                    <p className="text-gray-400">{dish.Product_Description}</p>
                    <p className="font-bold text-orange-400">
                      ${dish.Product_Price.toFixed(2)} each
                    </p>
                    <p className="text-gray-400">Rating: {dish.Product_Rating} ⭐</p>
                    <p className="text-gray-400">Discount: ${dish.Product_Discount_Price.toFixed(2)}</p>
                    <p className="text-lg font-bold text-gray-200">
                      Current Price: ${(dish.Product_Price - dish.Product_Discount_Price).toFixed(2)}
                    </p>
                    <p className="text-gray-400">Attributes: {dish.Attribute_Combination}</p>
                  </div>
                </div>

                {/* Quantity Dropdown */}
                <div className="flex items-center">
                  <label className="mr-2 text-lg">Quantity:</label>
                  <select
                    value={quantities[index]}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="bg-gray-700 text-white rounded-md p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num} className="bg-gray-800">
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Remove Button */}
                <div
                  onClick={() => {  dispatch({type:"REMOVE_FROM_CART" ,payload:{ Product_Name:dish.Product_Name}})

                  }}
                  className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <FaTrash />
                  <span>Remove</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* Total Amount Section */}
        {dishes.length > 0 && (
          <div className="text-center mt-8">
            <h2 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Total Amount: ${getTotalPrice()}
            </h2>
            <h2 className="text-xl font-semibold text-gray-300">
              Tax (10%): ${getTax()}
            </h2>
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              Final Amount: ${getFinalPrice()}
            </h2>
          </div>
        )}

        {/* Confirm Button */}
        {dishes.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={handleConfirmOrder}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
            >
              Confirm Order
            </button>
          </div>
        )}

        {/* Shipping and Payment Section */}
        {dishes.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-semibold mb-4">Shipping & Payment</h2>
            <div className="flex items-center space-x-4 mb-4">
              <FaShippingFast className="text-yellow-400 text-2xl" />
              <span className="text-lg">Free Shipping on orders over $50!</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaCreditCard className="text-blue-500 text-2xl" />
              <span className="text-lg">Secure Payment Methods Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage of MyCart component with dish handlers
const App = () => {
  const handleRemove = (id) => {
    // console.log(`Remove dish with ID: ${id}`);
    // Implement remove functionality
  };

  return <MyCart onRemove={handleRemove} />;
};

export default App;
