import React, { useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCheckCircle, FaStar, FaStore, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, selectCartLoading, selectCartError, fetchCart, removeFromCartAsync, updateQuantity, clearCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';

// --- DUMMY DATA FOR DEMONSTRATION ---
const DUMMY_CART_DATA = [
  {
    ID: 'dummy-1',
    Product_Name: 'Spicy Chicken Wings',
    Product_Description: 'Crispy chicken wings tossed in a fiery hot sauce with a hint of garlic and lime.',
    image: 'https://images.unsplash.com/photo-1599499808453-61b4d24177b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODc3NTJ8MHwxfHNlYXJjaHw3fHxjaGlja2VuJTIwd2luZ3N8ZW58MHx8fHwxNzE5NjMxNjAyfDA&ixlib=rb-4.0.3&q=80&w=400',
    Product_Price: 350.00,
    Product_Discount_Price: 50.00, // Strikethrough price will be 350+50 = 400
    Product_Rating: 4.8,
    Attribute_Combination: 'Regular, Spicy',
    get_product_category: { Product_Category: 'Appetizers' },
    quantity: 2,
  },
  {
    ID: 'dummy-2',
    Product_Name: 'Classic Veggie Burger',
    Product_Description: 'A wholesome patty made from mixed vegetables and lentils, served on a toasted bun with fresh lettuce and tomato.',
    image: 'https://images.unsplash.com/photo-1598463590559-00f7e817a01d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODc3NTJ8MHwxfHNlYXJjaHw3fHx2ZWdnaWUlMjBidXJnZXJ8ZW58MHx8fHwxNzE5NjMxNTgwfDA&ixlib=rb-4.0.3&q=80&w=400',
    Product_Price: 280.00,
    Product_Discount_Price: 0,
    Product_Rating: 4.5,
    Attribute_Combination: 'Standard, with cheese',
    get_product_category: { Product_Category: 'Main Course' },
    quantity: 1,
  },
];
// --- END OF DUMMY DATA ---

const MyCart = () => {
  const cartFromRedux = useSelector(selectCart);
  const loading = useSelector(selectCartLoading);
  const error = useSelector(selectCartError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use dummy data if Redux cart is empty and not loading
  const cart = cartFromRedux.length === 0 && !loading && !error ? DUMMY_CART_DATA : cartFromRedux;
  
  // State to hold local quantities for a snappy UI
  const [quantities, setQuantities] = useState({});
  // State to manage dropdown visibility for each item
  const [openDetails, setOpenDetails] = useState({});

  useEffect(() => {
    // Only fetch from Redux if you are not using dummy data
    if (cartFromRedux.length === 0 && !loading && !error) {
      // If we are showing dummy data, don't dispatch another fetch call.
      return; 
    }
    dispatch(fetchCart());
  }, [dispatch, cartFromRedux.length, loading, error]);

  // Sync local quantities with cart data (Redux or dummy)
  useEffect(() => {
    if (cart.length > 0) {
      const initialQuantities = cart.reduce((acc, dish) => {
        acc[dish.ID] = dish.quantity;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cart]);

  // Function to toggle details dropdown
  const toggleDetails = (dishId) => {
    setOpenDetails(prevState => ({
      ...prevState,
      [dishId]: !prevState[dishId]
    }));
  };

  // Calculate prices
  const getSubtotal = () => {
    return cart.reduce((total, dish) => {
      const quantity = quantities[dish.ID] || dish.quantity;
      return total + dish.Product_Price * quantity;
    }, 0);
  };

  const getDiscount = () => {
    return cart.reduce((total, dish) => {
      const quantity = quantities[dish.ID] || dish.quantity;
      return total + (dish.Product_Discount_Price ? parseFloat(dish.Product_Discount_Price) : 0) * quantity;
    }, 0);
  };

  const getDeliveryCharges = (subtotal) => {
    return subtotal > 500 ? 0 : 40;
  };

  const getGrandTotal = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    const delivery = getDeliveryCharges(subtotal);
    return (subtotal - discount + delivery);
  };

  const handleQuantityChange = (dishId, value) => {
    const newQuantity = Math.max(1, Number(value));
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [dishId]: newQuantity
    }));
    // Only dispatch to Redux if the item is from the actual cart, not dummy data
    if (cartFromRedux.some(item => item.ID === dishId)) {
        dispatch(updateQuantity({ ID: dishId, quantity: newQuantity }));
    }
  };

  const handleRemove = (dish) => {
    // Only dispatch to Redux if the item is from the actual cart
    if (cartFromRedux.some(item => item.ID === dish.ID)) {
        dispatch(removeFromCartAsync(dish.ID));
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout! Thank you for your order.");
    navigate('/checkout');
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-2 md:p-4">
        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-t-4 border-t-orange-500 border-gray-700 rounded-full mb-2 md:mb-3 animate-spin"></div>
        <div className="text-lg md:text-xl font-bold text-orange-400 tracking-wide animate-pulse">
          Loading your cart...
        </div>
        <p className="mt-1 text-gray-500 text-xs md:text-sm">Please wait while we fetch your items.</p>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-2 md:p-4 text-white">
        <div className="text-4xl md:text-5xl text-red-500 mb-2 md:mb-3 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-lg md:text-xl font-bold text-red-400 text-center">
          Oops! Something went wrong.
        </div>
        <p className="mt-1 text-gray-400 text-sm md:text-base">{error}</p>
        <div
          onClick={() => dispatch(fetchCart())}
          className="mt-3 md:mt-4 px-4 py-2 md:px-6 md:py-2 bg-red-600 text-white rounded-full font-semibold shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs md:text-sm"
        >
          Retry
        </div>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryCharges = getDeliveryCharges(subtotal);
  const grandTotal = getGrandTotal();

  return (
    <div className="min-h-screen bg-gray-950 p-2 md:p-4 sm:p-6 lg:p-8 text-gray-200 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8">
        {/* Main Cart Section */}
        <div className="flex-1 flex flex-col gap-3 md:gap-6">
          {/* Back div and title */}
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
            <div onClick={() => navigate(-1)} className="text-orange-300 hover:text-orange-400 transition-colors text-lg md:text-xl sm:text-2xl">
              <FaArrowLeft />
            </div>
            <h1 className="text-xl md:text-3xl sm:text-4xl font-bold tracking-tight text-white">Your Shopping Cart</h1>
          </div>

          {/* Cart Items List */}
          {cart.length > 0 ? (
            <div className="space-y-2 md:space-y-4 max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-150px)] overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
              {cart.map((dish) => (
                <div
                  key={dish.ID}
                  className="flex flex-col p-2 md:p-4 rounded-lg md:rounded-xl bg-gray-800 shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg hover:border-orange-600 border border-transparent"
                >
                  {/* Top row for mobile view: Image, Name, Price, Quantity controls */}
                  <div className="flex flex-row items-center gap-2 md:gap-4">
                    {/* Dish Image */}
                    <div className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0 relative">
                      <img
                        src={dish.image}
                        alt={dish.Product_Name}
                        className="w-full h-full object-cover rounded-md md:rounded-lg border border-orange-500 shadow-sm"
                      />
                      {dish.Product_Discount_Price > 0 && (
                        <span className="absolute top-0.5 left-0.5 md:top-1 md:left-1 bg-red-600 text-white text-[10px] md:text-xs font-bold px-1 py-0.5 md:px-1.5 md:py-0.5 rounded-full animate-pulse-fade">
                          {((dish.Product_Discount_Price / (dish.Product_Price + dish.Product_Discount_Price)) * 100).toFixed(0)}% OFF
                        </span>
                      )}
                    </div>
                    {/* Dish Name & Dropdown Toggle */}
                    <div className="flex-1">
                      <h2 className="text-sm md:text-lg sm:text-xl font-bold text-orange-200 mb-0.5 md:mb-1">{dish.Product_Name}</h2>
                      {/* Only show on mobile */}
                      <div className="md:hidden flex items-center justify-between mt-1 md:mt-2">
                          <div className="flex items-center gap-1 md:gap-2">
                              <span className="text-sm md:text-lg font-bold text-white">₹{dish.Product_Price}</span>
                              {dish.Product_Discount_Price > 0 && (
                                <span className="line-through text-gray-500 text-[10px] md:text-xs">
                                  ₹{(dish.Product_Price + dish.Product_Discount_Price).toFixed(2)}
                                </span>
                              )}
                          </div>
                          <div
                              onClick={() => toggleDetails(dish.ID)}
                              className="text-gray-400 hover:text-gray-200 transition-colors"
                              aria-expanded={!!openDetails[dish.ID]}
                              aria-controls={`details-panel-${dish.ID}`}
                              aria-label="Toggle details"
                          >
                              {openDetails[dish.ID] ? <FaChevronUp className="text-xs md:text-sm" /> : <FaChevronDown className="text-xs md:text-sm" />}
                          </div>
                      </div>
                    </div>
                    {/* Quantity and Price (always visible on all screens) */}
                    <div className="flex items-center gap-2 md:gap-4 ml-auto">
                        <div className="flex items-center bg-gray-700 rounded-full p-0.5 border border-gray-600 transition-all duration-200 focus-within:ring-1 focus-within:ring-orange-400">
                            {/* Minus div */}
                            <div
                                onClick={() => handleQuantityChange(dish.ID, (quantities[dish.ID] || dish.quantity) - 1)}
                                disabled={(quantities[dish.ID] || dish.quantity) <= 1}
                                className={`p-1 md:p-1.5 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 active:scale-95 text-xs md:text-sm ${((quantities[dish.ID] || dish.quantity) <= 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label="Decrease quantity"
                            >
                                <FaMinus />
                            </div>
                            <input
                                type="number"
                                min="1"
                                value={quantities[dish.ID] || dish.quantity}
                                onChange={e => handleQuantityChange(dish.ID, e.target.value)}
                                className="w-8 md:w-10 text-center bg-transparent text-white font-bold text-sm md:text-base border-none focus:outline-none appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-div]:appearance-none [&::-webkit-inner-spin-div]:appearance-none"
                                aria-label={`Quantity for ${dish.Product_Name}`}
                            />
                            {/* Plus div */}
                            <div
                                onClick={() => handleQuantityChange(dish.ID, (quantities[dish.ID] || dish.quantity) + 1)}
                                className="p-1 md:p-1.5 rounded-full text-white bg-orange-600 hover:bg-orange-700 transition-colors duration-200 active:scale-95 text-xs md:text-sm"
                                aria-label="Increase quantity"
                            >
                                <FaPlus />
                            </div>
                        </div>
                        {/* Remove div (always visible) */}
                        <div
                            onClick={() => handleRemove(dish)}
                            className="text-red-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110 active:scale-95 text-lg md:text-xl"
                            aria-label="Remove item"
                        >
                            <FaTrash />
                        </div>
                    </div>
                  </div>

                  {/* Details section (hidden by default on mobile, toggled with dropdown) */}
                  <div
                    id={`details-panel-${dish.ID}`}
                    className={`transition-all ease-in-out duration-300 overflow-hidden ${openDetails[dish.ID] ? 'max-h-96 opacity-100 mt-2 md:mt-4' : 'max-h-0 opacity-0'} sm:max-h-full sm:opacity-100 sm:mt-0`}
                  >
                      <div className="pt-1 md:pt-2 sm:pt-0">
                          <p className="text-gray-400 text-[10px] md:text-xs sm:text-sm mb-0.5 md:mb-1 line-clamp-2">{dish.Product_Description}</p>
                          <div className="flex items-center gap-0.5 md:gap-1 text-yellow-400 text-xs md:text-sm mb-0.5 md:mb-1">
                              <FaStar /> {dish.Product_Rating}
                          </div>
                          <p className="text-gray-500 text-[10px] md:text-xs mt-0.5 md:mt-1">
                              Category: <span className="font-semibold">{dish.get_product_category.Product_Category}</span>
                          </p>
                          <p className="text-gray-500 text-[10px] md:text-xs">
                              Attributes: <span className="font-semibold">{dish.Attribute_Combination}</span>
                          </p>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // --- EMPTY CART LAYOUT WITH FIRETIME ANIMATION ---
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-250px)] text-center px-2 md:px-4 py-8 md:py-12 rounded-xl md:rounded-2xl relative overflow-hidden bg-gray-900 border border-gray-700 firetime-bg">
                <div className="relative z-10">
                    <img src="https://placehold.co/200x200/FF8C00/FFFFFF/png?text=Empty+Cart" alt="Empty Cart" className="w-24 h-24 md:w-36 md:h-36 sm:w-48 sm:h-48 mb-4 md:mb-6 opacity-90 animate-fade-in drop-shadow-2xl" />
                    <h2 className="text-2xl md:text-3xl sm:text-4xl font-bold text-white mb-2 md:mb-3 drop-shadow-lg">Your cart is empty!</h2>
                    <p className="text-gray-400 text-sm md:text-base sm:text-lg max-w-lg mb-6 md:mb-8">
                        Looks like you haven't added anything to your cart yet.
                        <br/>
                        Let's fill it up with some delicious food!
                    </p>
                    <div
                        onClick={() => navigate('/dish')}
                        className="px-6 py-2 md:px-8 md:py-3 text-base md:text-lg font-bold bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-orange-600 hover:to-red-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        <FaStore className="inline-block mr-1.5 md:mr-2 text-lg md:text-xl" />
                        Explore Our Menu
                    </div>
                </div>
            </div>
          )}
        </div>

        {/* Cart Summary & Checkout Sidebar */}
        {cart.length > 0 && (
          <div className="w-full lg:w-80 p-4 md:p-6 rounded-lg md:rounded-xl bg-gray-800 shadow-lg flex flex-col gap-3 md:gap-4 lg:sticky lg:top-8 self-start transition-all duration-300">
            <h2 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">Order Summary</h2>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm font-medium text-gray-300">
              <div className="flex justify-between items-center border-b border-gray-700 pb-1 md:pb-2">
                <span>Subtotal</span>
                <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-1 md:pb-2">
                <span>Discount</span>
                <span className="font-semibold text-green-400">- ₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-1 md:pb-2">
                <span>Delivery Charges</span>
                <span className={`font-semibold ${deliveryCharges === 0 ? 'text-green-400' : 'text-white'}`}>
                  {deliveryCharges === 0 ? 'Free' : `₹${deliveryCharges.toFixed(2)}`}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center text-lg md:text-xl font-bold text-orange-300 pt-2 md:pt-3 border-t border-gray-700">
              <span>Grand Total</span>
              <span className="drop-shadow-sm">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div
              onClick={handleCheckout}
              className="w-full py-2 md:py-3 mt-3 md:mt-4 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-lg text-base md:text-lg shadow-md flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.01] active:scale-98 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <FaCheckCircle className="text-lg md:text-xl" />
              Checkout
            </div>
            <div className="mt-1 md:mt-2 text-center text-gray-400 text-[10px] md:text-xs">
              <p>Secure payments guaranteed.</p>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Checkout div for Mobile (when cart is not empty) */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-2 md:p-3 bg-gray-900 border-t border-gray-800 z-50 shadow-lg transition-transform duration-300 ease-out transform translate-y-0">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px] md:text-xs">Grand Total</span>
              <span className="text-lg md:text-2xl font-extrabold text-white">₹{grandTotal.toFixed(2)}</span>
            </div>
            <div
              onClick={handleCheckout}
              className="w-auto px-4 py-1.5 md:px-6 md:py-2 bg-gradient-to-r from-orange-600 to-red-700 text-white font-bold rounded-full text-sm md:text-base shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <FaCheckCircle className="inline-block mr-1 md:mr-1.5 text-sm md:text-lg" />
              Checkout
            </div>
          </div>
        </div>
      )}

      {/* Custom Keyframe Animations and Scrollbar Styling */}
      <style jsx>{`
        @keyframes pulse-fade {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        .animate-pulse-fade {
          animation: pulse-fade 2s infinite ease-in-out;
        }
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out forwards;
        }

        /* FIRETIME Background Animation */
        @keyframes firetime {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .firetime-bg {
          background-image: radial-gradient(circle at 10% 20%, rgba(248, 179, 13, 0.1) 0%, transparent 40%),
                            radial-gradient(circle at 90% 80%, rgba(255, 69, 0, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(255, 140, 0, 0.05) 0%, transparent 60%);
          background-size: 200% 200%;
          animation: firetime 20s infinite alternate ease-in-out;
        }

        /* Custom Scrollbar for Cart Items */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #333; /* Darker track */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316; /* Orange thumb */
          border-radius: 10px;
          border: 2px solid #333; /* Border around thumb */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c; /* Darker orange on hover */
        }
      `}</style>
    </div>
  );
};

export default MyCart;