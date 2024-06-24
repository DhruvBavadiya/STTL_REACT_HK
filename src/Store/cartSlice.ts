// Store/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  userId: string | null; // Updated to explicitly include null for logged-out state
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartState') || '[]') || [], // Initialize from localStorage
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const { id, name, price, quantity, image, userId } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity += quantity;
        }
      } else {
        state.items.push({ id, name, price, quantity, image, userId });
      }
      localStorage.setItem('cartState', JSON.stringify(state.items)); // Update localStorage
    },
    decreaseItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
      localStorage.setItem('cartState', JSON.stringify(state.items)); // Update localStorage
    },
    increaseItem(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      if (existingItem) {
        if (existingItem.quantity < 5) {
          existingItem.quantity += 1;
        }
      }
      localStorage.setItem('cartState', JSON.stringify(state.items)); // Update localStorage
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartState', JSON.stringify(state.items)); // Update localStorage
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem('cartState'); // Clear localStorage
    },
    updateUserId(state, action: PayloadAction<string>) {
      const userId = action.payload;
      state.items.forEach(item => {
        item.userId = userId;
      });
      localStorage.setItem('cartState', JSON.stringify(state.items)); // Update localStorage
    },
  },
});

export const { addItem, decreaseItem, removeItem, clearCart, increaseItem, updateUserId } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
