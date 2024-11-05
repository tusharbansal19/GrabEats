import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartProvider';

const DishShowcase = () => {
    const {dispatch}=useCart();
    const navigator=useNavigate();
    const location = useLocation();
    const [ProductPrice ,setProductPrice]=useState();
    const  dish  = location.state ||
    {
        "ID": 21,
        "Product_Name": "Chickpea Salad",
        "Product_Description": "A refreshing salad with chickpeas, cucumber, tomatoes, and lemon dressing.",
        "Product_Rating": 4.8,
        "get_product_category": {
            "ID": 403,
            "Product_Category": "Salad",
            "Picture_Url": "https://thumbs.dreamstime.com/b/bowl-spinach-chickpea-salad-black-background-generative-ai-bowl-spinach-chickpea-salad-black-background-296944346.jpg"
        },
        "get_all_products": [
            {
                "Product_ID": 1031,
                "Picture_URL": "https://thumbs.dreamstime.com/b/bowl-spinach-chickpea-salad-black-background-generative-ai-bowl-spinach-chickpea-salad-black-background-296944346.jpg",
                "Attribute_Combination": "Large, Extra Lemon",
                "Product_Price": 9.99,
                "Product_Discount_Price": 8.49
            },
            {
                "Product_ID": 1032,
                "Picture_URL": "https://thumbs.dreamstime.com/b/bowl-spinach-chickpea-salad-black-background-generative-ai-bowl-spinach-chickpea-salad-black-background-296944346.jpg",
                "Attribute_Combination": "Small, No Onions",
                "Product_Price": 6.99,
                "Product_Discount_Price": 5.99
            }
        ]
    };

    const [quantity, setQuantity] = useState(1); // State for quantity
    const [selectedProduct, setSelectedProduct] = useState(dish.get_all_products[0]); // State for selected product variation

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleProductChange = (e) => {
        const selectedOption = dish.get_all_products.find(
            (product) => product.Attribute_Combination === e.target.value
        );
        setSelectedProduct(selectedOption);
        // console.log(selectedOption);
    };

    const handleAddToCart = () => {

        dispatch({type:"ADD_TO_CART" ,payload:{ quantity:quantity , ...dish,Product_Discount_Price:selectedProduct.Product_Discount_Price, Product_Price:selectedProduct.Product_Price}})
     navigator("/menu")
        // Logic to add to cart can go here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-orange-950 text-white p-8">
            <div className="container mx-auto flex flex-col md:flex-row shadow-lg rounded-lg overflow-x-hidden">
                {/* Left Section: Image */}
                <div className="md:w-1/2 w-full">
                    <img
                        src={dish.get_product_category.Picture_Url}
                        alt={dish.Product_Name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section: Details */}
                <div className="md:w-1/2 w-full bg-black bg-opacity-70 p-6">
                    {/* Product Name and Rating */}
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold mb-2">{dish.Product_Name}</h1>
                        <p className="text-yellow-400 text-xl">Rating: {dish.Product_Rating} ⭐</p>
                    </div>

                    {/* Product Description */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Description</h2>
                        <p className="text-gray-300">{dish.Product_Description}</p>
                    </div>

                    {/* Product Category */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Category</h2>
                        <p className="text-gray-300">{dish.get_product_category.Product_Category}</p>
                    </div>

                    {/* Attributes Selection Section */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Choose Size/Attribute</h2>
                        <select
                            onChange={handleProductChange}
                            value={selectedProduct.Attribute_Combination}
                            className="p-2 text-black rounded w-full"
                        >
                            {dish.get_all_products.map((product, index) => (
                                <option key={index} value={product.Attribute_Combination}>
                                    {product.Attribute_Combination}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Pricing Section */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Price</h2>
                        <div className="mb-2">
                            <p className="text-lg">
                                {selectedProduct.Attribute_Combination} - 
                                <span className="line-through text-gray-400 ml-2">
                                    ${selectedProduct.Product_Price.toFixed(2)}
                                </span>
                                <span className="text-orange-400 font-bold ml-2">
                                    ${selectedProduct.Product_Discount_Price.toFixed(2)}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Quantity Section */}
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Quantity</h2>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 p-2 text-black rounded"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <div className="mb-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DishShowcase;
