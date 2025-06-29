import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch cart from API
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    const email = localStorage.getItem('email');
    console.log('Fetching cart for email:', email);
    if (!email) return rejectWithValue('User not logged in');
    try {
      const response = await axios.get(`https://grabeats-server.onrender.com/grabeats/mycart/get?email=${email}`);
      console.log('Fetch cart response:', response.data);
      console.log('Response data structure:', JSON.stringify(response.data, null, 2));
      
      // Try to find the cart array in the response
      let cartData = [];
      if (response.data.cart && Array.isArray(response.data.cart)) {
        cartData = response.data.cart;
      } else if (response.data.data && response.data.data.cart && Array.isArray(response.data.data.cart)) {
        cartData = response.data.data.cart;
      } else if (response.data.data && Array.isArray(response.data.data)) {
        cartData = response.data.data;
      } else if (response.data.data && response.data.data.items && Array.isArray(response.data.data.items)) {
        cartData = response.data.data.items;
      }
      
      console.log('Extracted cart data:', cartData);
      return cartData;
    } catch (err) {
      console.error('Fetch cart error:', err);
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch cart');
    }
  }
);

// Async thunk to add product to cart
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (product, { rejectWithValue }) => {
    const email = localStorage.getItem('email');
    console.log('Adding to cart for email:', email);
    console.log('Product to add:', product);
    if (!email) return rejectWithValue('User not logged in');
    try {
      const response = await axios.post('https://grabeats-server.onrender.com/grabeats/mycart/add', { email, product });
      console.log('Add to cart response:', response.data);
      return response.data.cart;
    } catch (err) {
      console.error('Add to cart error:', err);
      return rejectWithValue(err.response?.data?.error || 'Failed to add product to cart');
    }
  }
);

// Async thunk to remove product from cart
export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    const email = localStorage.getItem('email');
    if (!email) return rejectWithValue('User not logged in');
    try {
      const response = await axios.delete('https://grabeats-server.onrender.com/grabeats/mycart/delete', { data: { email, productId } });
      return response.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Failed to remove product from cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.ID === action.payload.ID && i.Attribute_Combination === action.payload.Attribute_Combination);
      if (item) item.quantity = action.payload.quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
export const selectCart = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error; 