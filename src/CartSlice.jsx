import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // 🔴 Add logic to check if item already exists
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // 🔴 If item exists, increment quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // 🔴 If not, add item with quantity 1
      }
    },
    removeItem: (state, action) => {
      // 🔴 Remove item based on its name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      // 🔴 Extract item name and quantity from payload
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; // 🔴 Update item quantity
      }
    },
  },
});

// 🔴 Export action creators for use in components like ProductList and CartItem
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// 🔴 Export reducer as default for use in store.js
export default CartSlice.reducer;
