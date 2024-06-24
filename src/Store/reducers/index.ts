import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../cartSlice'; // Import your cart slice reducer

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here
});

export default rootReducer;
