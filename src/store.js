import { configureStore } from '@reduxjs/toolkit';
import dishesReducer from './store/dishesSlice';
import cartReducer from './store/cartSlice';
import authReducer from './store/authSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
}); 