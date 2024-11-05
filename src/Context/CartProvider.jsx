// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the cart
const initialState = {
    cart: []
};

// Create a context
const CartContext = createContext(initialState);

// Cart reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': 
        {
            // console.log(action.payload)
            return { ...state, cart: [...state.cart, action.payload] };}
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product.Product_Name !== action.payload.Product_Name)
            };
        case 'CLEAR_CART':
            return { ...state, cart: [] };
        default:
            return state;
    }
};

// Cart Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};
