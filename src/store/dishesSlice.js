import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const randomImages = [
  '/Images/1.1.jpg', '/Images/1.2.jpg', '/Images/1.3.jpg', '/Images/1.4.jpg', '/Images/1.5.jpg',
  'https://source.unsplash.com/400x300/?pizza',
  'https://source.unsplash.com/400x300/?burger',
  'https://source.unsplash.com/400x300/?salad',
  'https://source.unsplash.com/400x300/?pasta',
  'https://source.unsplash.com/400x300/?sushi',
  'https://source.unsplash.com/400x300/?noodles',
  'https://source.unsplash.com/400x300/?steak',
  'https://source.unsplash.com/400x300/?dessert',
  'https://source.unsplash.com/400x300/?sandwich',
  'https://source.unsplash.com/400x300/?fries',
  'https://source.unsplash.com/400x300/?taco',
  'https://source.unsplash.com/400x300/?wrap',
  'https://source.unsplash.com/400x300/?curry',
  'https://source.unsplash.com/400x300/?paneer',
  'https://source.unsplash.com/400x300/?biryani',
  'https://source.unsplash.com/400x300/?chicken',
  'https://source.unsplash.com/400x300/?fish',
  'https://source.unsplash.com/400x300/?rice',
  'https://source.unsplash.com/400x300/?soup',
  'https://source.unsplash.com/400x300/?pizza,cheese',
  'https://source.unsplash.com/400x300/?pizza,veggie',
  'https://source.unsplash.com/400x300/?pizza,pepperoni',
  'https://source.unsplash.com/400x300/?pizza,margherita',
  'https://source.unsplash.com/400x300/?pizza,hawaiian',
  'https://source.unsplash.com/400x300/?pizza,bbq',
];

const categories = [
  'Pizza', 'Burger', 'Salad', 'Pasta', 'Sushi', 'Noodles', 'Steak', 'Dessert', 'Sandwich', 'Fries',
  'Taco', 'Wrap', 'Curry', 'Paneer', 'Biryani', 'Chicken', 'Fish', 'Rice', 'Soup'
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const API_BASE = 'http://localhost:8000/grabeats';

// Dummy data for fallback when API fails
const dummyDishes = [
  {
    ID: 1,
    Product_Name: "Margherita Pizza",
    Product_Description: "Classic pizza with tomato sauce, mozzarella, and basil.",
    Product_Rating: 4.5,
    get_product_category: {
      ID: 101,
      Product_Category: "Pizza",
      Picture_Url: "https://thumbs.dreamstime.com/b/margherita-pizza-classic-tomato-sauce-mozzarella-basil-216123456.jpg"
    },
    get_all_products: [
      {
        Product_ID: 1001,
        Picture_URL: "https://thumbs.dreamstime.com/b/pizza-large-extra-cheese-216123457.jpg",
        Attribute_Combination: "Large, Extra Cheese",
        Product_Price: 14.99,
        Product_Discount_Price: 12.99
      },
      {
        Product_ID: 1002,
        Picture_URL: "https://thumbs.dreamstime.com/b/pizza-small-basic-216123458.jpg",
        Attribute_Combination: "Small, Basic",
        Product_Price: 9.99,
        Product_Discount_Price: 8.49
      }
    ]
  },
  {
    ID: 2,
    Product_Name: "Caesar Salad",
    Product_Description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan cheese.",
    Product_Rating: 4.3,
    get_product_category: {
      ID: 102,
      Product_Category: "Salad",
      Picture_Url: "https://thumbs.dreamstime.com/b/caesar-salad-fresh-romaine-lettuce-dressing-croutons-216123459.jpg"
    },
    get_all_products: [
      {
        Product_ID: 1003,
        Picture_URL: "https://thumbs.dreamstime.com/b/salad-large-extra-dressing-216123460.jpg",
        Attribute_Combination: "Large, Extra Dressing",
        Product_Price: 11.99,
        Product_Discount_Price: 9.99
      },
      {
        Product_ID: 1004,
        Picture_URL: "https://thumbs.dreamstime.com/b/salad-small-light-dressing-216123461.jpg",
        Attribute_Combination: "Small, Light Dressing",
        Product_Price: 7.99,
        Product_Discount_Price: 6.49
      }
    ]
  }
];

// Async thunk to fetch dishes from API
export const fetchDishes = createAsyncThunk(
  'dishes/fetchDishes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/get`);
      // If your API returns { data: [...] }, adjust accordingly
      return response.data.data || response.data;
    } catch (err) {
      console.warn('API failed, using dummy data:', err.message);
      // Return dummy data instead of rejecting when API fails
      return dummyDishes;
    }
  }
);

// Add a new dish
export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (dish, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE}/dishes`, dish);
      return response.data.data || response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Network error');
    }
  }
);

// Update a dish
export const updateDish = createAsyncThunk(
  'dishes/updateDish',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE}/dishes/${id}`, updates);
      return response.data.data || response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Network error');
    }
  }
);

// Delete a dish
export const deleteDish = createAsyncThunk(
  'dishes/deleteDish',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE}/dishes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Network error');
    }
  }
);

const initialState = {
  dishes: [],
  loading: false,
  error: null,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.dishes = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch dishes';
      })
      // Add
      .addCase(addDish.fulfilled, (state, action) => {
        state.dishes.push(action.payload);
      })
      // Update
      .addCase(updateDish.fulfilled, (state, action) => {
        const idx = state.dishes.findIndex(d => d.ID === action.payload.ID);
        if (idx !== -1) state.dishes[idx] = action.payload;
      })
      // Delete
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.dishes = state.dishes.filter(d => d.ID !== action.payload);
      });
  },
});

export default dishesSlice.reducer;
export const selectDishes = (state) => state.dishes.dishes;
export const selectDishesLoading = (state) => state.dishes.loading;
export const selectDishesError = (state) => state.dishes.error; 