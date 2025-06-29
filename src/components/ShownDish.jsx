import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAsync, selectCartLoading, selectCartError } from '../store/cartSlice';

const DishShowcase = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const location = useLocation();
    const loading = useSelector(selectCartLoading);
    const error = useSelector(selectCartError);
    const dish = location.state || {
        "ID": 21,
        "Product_Name": "Grilled Zucchini and Barley Salad",
        "Product_Description": "Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat (the second one from forward), it was my cheerful duty to attend upon him while taking that hard-scrabble scramble upon the dead whale's back. You have seen Italian organ boys holding a dancing-ape by a long cord.",
        "Product_Rating": 4.8,
        "get_product_category": {
            "ID": 403,
            "Product_Category": "Salad",
            "Picture_Url": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        "get_all_products": [
            {
                "Product_ID": 1031,
                "Picture_URL": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "Attribute_Combination": "1 Serving",
                "Product_Price": 250,
                "Product_Discount_Price": 210
            },
            {
                "Product_ID": 1032,
                "Picture_URL": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "Attribute_Combination": "2 Servings",
                "Product_Price": 450,
                "Product_Discount_Price": 380
            },
            {
                "Product_ID": 1033,
                "Picture_URL": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "Attribute_Combination": "3 Servings",
                "Product_Price": 650,
                "Product_Discount_Price": 550
            },
            {
                "Product_ID": 1034,
                "Picture_URL": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "Attribute_Combination": "4 Servings",
                "Product_Price": 850,
                "Product_Discount_Price": 720
            },
            {
                "Product_ID": 1035,
                "Picture_URL": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                "Attribute_Combination": "5+ Servings",
                "Product_Price": 1000,
                "Product_Discount_Price": 850
            }
        ]
    };

    const [quantity, setQuantity] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(dish.get_all_products[0]);
    const [activeTab, setActiveTab] = useState('details');
    const [success, setSuccess] = useState(false);

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const handleProductChange = (servingSize) => {
        const selectedOption = dish.get_all_products.find(
            (product) => product.Attribute_Combination === servingSize
        );
        setSelectedProduct(selectedOption);
    };

    const handleAddToCart = async () => {
        setSuccess(false);
        const resultAction = await dispatch(addToCartAsync({
            ID: dish.ID,
            Product_Name: dish.Product_Name,
            Product_Description: dish.Product_Description,
            Product_Rating: dish.Product_Rating,
            get_product_category: dish.get_product_category,
            Attribute_Combination: selectedProduct.Attribute_Combination,
            Product_Price: selectedProduct.Product_Price,
            Product_Discount_Price: selectedProduct.Product_Discount_Price,
            image: selectedProduct.Picture_URL,
            quantity: Number(quantity)
        }));
        if (addToCartAsync.fulfilled.match(resultAction)) {
            setSuccess(true);
            setTimeout(() => {
                navigator('/cart');
            }, 500);
        }
    };

    // Sample data for tabs
    const reviews = [
        {
            id: 1,
            name: "Marie Morrison",
            rating: 4,
            comment: "I have hinted that I would often jerk poor Queequeg from between the whale and the ship--where he would occasionally fall, from the incessant rolling and swaying of both.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
            date: "2 days ago"
        },
        {
            id: 2,
            name: "Brandon Porter",
            rating: 5,
            comment: "In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew. Now hands are wanted here, and then again.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
            date: "1 week ago"
        },
        {
            id: 3,
            name: "James Peters",
            rating: 3,
            comment: "In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
            date: "2 weeks ago"
        },
        {
            id: 4,
            name: "Judy Arnold",
            rating: 5,
            comment: "Being the savage's bowsman, that is, the person who pulled the bow-oar in his boat, it was my cheerful duty to attend upon him.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
            date: "3 weeks ago"
        }
    ];

    const nutritionData = [
        { label: "Calories", value: "185 kcal", daily: "9%" },
        { label: "Protein", value: "8.2g", daily: "16%" },
        { label: "Carbohydrates", value: "32.1g", daily: "12%" },
        { label: "Dietary Fiber", value: "6.4g", daily: "23%" },
        { label: "Total Fat", value: "4.1g", daily: "5%" },
        { label: "Saturated Fat", value: "0.8g", daily: "4%" },
        { label: "Sodium", value: "245mg", daily: "11%" },
        { label: "Potassium", value: "420mg", daily: "12%" },
        { label: "Vitamin C", value: "25mg", daily: "28%" },
        { label: "Iron", value: "2.1mg", daily: "12%" },
        { label: "Calcium", value: "95mg", daily: "7%" },
        { label: "Magnesium", value: "78mg", daily: "19%" }
    ];

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`text-yellow-400 ${i < rating ? 'opacity-100' : 'opacity-30'}`}>
                ★
            </span>
        ));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'details':
                return (
                    <div className="space-y-4 md:space-y-6 text-sm md:text-base text-gray-300">
                        <div>
                            <h3 className="font-semibold text-orange-200 mb-2 text-base md:text-lg">Ingredients</h3>
                            <p className="leading-relaxed">Fresh zucchini, pearl barley, garlic, olive oil, lemon juice, fresh herbs (parsley, mint, basil), cherry tomatoes, feta cheese, red onion, black pepper, sea salt, balsamic vinegar.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-200 mb-2 text-base md:text-lg">Preparation Method</h3>
                            <p className="leading-relaxed">Zucchini is carefully grilled to achieve perfect char marks while maintaining tender texture. Pearl barley is cooked al dente and mixed with fresh vegetables. Everything is tossed with our signature garlic lemon dressing and topped with crumbled feta cheese.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-200 mb-2 text-base md:text-lg">Allergen Information</h3>
                            <p className="leading-relaxed">Contains dairy (feta cheese). Contains gluten (barley). May contain traces of nuts. Vegan option available without cheese. Gluten-free option available with quinoa substitute.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-200 mb-2 text-base md:text-lg">Storage & Serving</h3>
                            <p className="leading-relaxed">Best served fresh at room temperature. Can be refrigerated for up to 3 days. Dressing served on the side to maintain crispness. Garnished with fresh herbs and lemon wedges.</p>
                        </div>
                    </div>
                );
            case 'nutrition':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base">
                            {nutritionData.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                                    <span className="text-gray-400">{item.label}</span>
                                    <div className="text-right">
                                        <span className="font-semibold text-white">{item.value}</span>
                                        <div className="text-xs text-gray-500">{item.daily} DV</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                            <p className="text-xs md:text-sm text-gray-400">
                                * Percent Daily Values are based on a 2000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
                            </p>
                        </div>
                    </div>
                );
            case 'reviews':
                return (
                    <div className="space-y-4">
                        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-lg text-white">Customer Reviews</h3>
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-yellow-400">
                                        {renderStars(Math.floor(dish.Product_Rating))}
                                    </div>
                                    <span className="font-semibold text-white">{dish.Product_Rating}</span>
                                    <span className="text-gray-500 text-sm">({reviews.length} reviews)</span>
                                </div>
                            </div>
                        </div>
                        {reviews.map((review) => (
                            <div key={review.id} className="flex space-x-3 p-3 md:p-4 bg-gray-800 rounded-lg border border-gray-700">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0 border-2 border-orange-600"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                        <div className="flex items-center space-x-2">
                                            <h4 className="font-semibold text-white text-sm md:text-base">{review.name}</h4>
                                            <div className="flex text-xs md:text-sm">
                                                {renderStars(review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 font-sans text-gray-200">
            {/* Loader overlay */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-t-4 border-t-orange-500 border-gray-700 rounded-full animate-spin"></div>
                </div>
            )}
            {/* Success message */}
            {success && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
                    Added to cart!
                </div>
            )}
            {/* Error message */}
            {error && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50">
                    {error}
                </div>
            )}
            {/* Header */}
            <div className="bg-gray-900 shadow-lg border-b border-gray-800">
                <div className="container mx-auto px-3 md:px-4 py-2 md:py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3 md:space-x-6">
                        <span className="text-gray-400 text-xs md:text-sm cursor-pointer hover:text-orange-400 transition-colors">Products</span>
                        <span className="text-gray-400 text-xs md:text-sm cursor-pointer hover:text-orange-400 transition-colors">Delivery Area</span>
                    </div>
                 
                    <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm">
                          <span className="text-gray-400 cursor-pointer hover:text-orange-400 transition-colors" onClick={() => navigator('/cart')}>View Cart</span>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                {/* <div className=""> */}
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Section: Image */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative">
                                <img
                                    src={dish.get_product_category.Picture_Url}
                                    alt={dish.Product_Name}
                                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl border-b-4 lg:border-b-0 lg:border-r-4 border-orange-600"
                                    onError={(e) => {
                                        e.target.src = '/Images/incir9023-scaled.jpg';
                                    }}
                                />
                                {/* Small product images */}
                                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex space-x-1 md:space-x-2">
                                    {[1, 2, 3].map((_, index) => (
                                        <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800 rounded-lg border-2 border-gray-700 shadow-lg flex items-center justify-center cursor-pointer hover:border-orange-500 transition-all duration-200">
                                            <span className="text-xs sm:text-sm">🥗</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Section: Details */}
                        <div className="lg:w-1/2 w-full p-4 md:p-6 lg:p-8">
                            {/* Product Name and Subtitle */}
                            <div className="mb-4 md:mb-6">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-400 mb-2 leading-tight">
                                    {dish.Product_Name}
                                </h1>
                                <p className="text-gray-500 text-xs md:text-sm">with Garlic Dressing</p>
                                <div className="flex flex-col sm:flex-row sm:items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="flex text-yellow-400 text-sm">
                                            {renderStars(Math.floor(dish.Product_Rating))}
                                        </div>
                                        <span className="text-gray-400 text-sm">({Math.floor(dish.Product_Rating * 10)})</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 sm:gap-2 text-xs">
                                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded-full border border-green-700">Pure Vegetarian</span>
                                        <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full border border-blue-700">Bestseller</span>
                                        <span className="bg-purple-900 text-purple-300 px-2 py-1 rounded-full border border-purple-700">Main Course</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-4 md:mb-6">
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {dish.Product_Description}
                                </p>
                            </div>

                            {/* Price */}
                            <div className="mb-4 md:mb-6">
                                <h2 className="text-base md:text-lg font-semibold text-white mb-2">Price</h2>
                                <div className="text-3xl md:text-4xl font-bold text-orange-400 drop-shadow-md">
                                    ₹{selectedProduct.Product_Discount_Price}
                                    {selectedProduct.Product_Price !== selectedProduct.Product_Discount_Price && (
                                        <span className="text-lg md:text-xl text-gray-500 line-through ml-2">
                                            ₹{selectedProduct.Product_Price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Serves Selection */}
                            <div className="mb-6 md:mb-8">
                                <h2 className="text-base md:text-lg font-semibold text-white mb-3">Serves</h2>
                                <div className="flex flex-wrap gap-2">
                                    {dish.get_all_products.map((product, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleProductChange(product.Attribute_Combination)}
                                            className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center text-sm md:text-base font-bold transition-all duration-200 shadow-lg ${
                                                selectedProduct.Attribute_Combination === product.Attribute_Combination
                                                    ? 'bg-orange-600 text-white border-orange-500 transform scale-110'
                                                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-orange-500 hover:scale-105'
                                            }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs md:text-sm text-gray-500 mt-2">
                                    Selected: <span className="font-semibold text-orange-300">{selectedProduct.Attribute_Combination}</span>
                                </p>
                            </div>

                            {/* Quantity Selection */}
                            <div className="mb-6 md:mb-8">
                                <h2 className="text-base md:text-lg font-semibold text-white mb-3">Quantity</h2>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-20 md:w-24 p-2 md:p-3 text-sm md:text-base text-center bg-gray-800 text-white font-bold border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="text-sm md:text-base text-gray-400">
                                        Total: <span className="font-bold text-white">₹{(selectedProduct.Product_Discount_Price * quantity).toFixed(0)}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 md:py-4 px-6 rounded-lg text-base md:text-lg shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="border-t border-gray-700">
                        <div className="flex border-b border-gray-700 overflow-x-auto">
                            {[
                                { key: 'details', label: 'Details' },
                                { key: 'nutrition', label: 'Nutrition' },
                                { key: 'reviews', label: 'Customer Reviews' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base font-semibold border-b-2 transition-all whitespace-nowrap ${
                                        activeTab === tab.key
                                            ? 'border-orange-500 text-orange-400 bg-gray-800'
                                            : 'border-transparent text-gray-400 hover:text-orange-300 hover:bg-gray-800'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="p-4 md:p-6 lg:p-8">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        
    );
};

export default DishShowcase;