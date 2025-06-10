import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // Hapus item berdasarkan nama
      const name = action.payload;
      state.items = state.items.filter(i => i.name !== name);
    },
    updateQuantity: (state, action) => {
      // Update quantity berdasarkan nama dan jumlah baru
      const { name, quantity } = action.payload;
      const item = state.items.find(i => i.name === name);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      // Jika quantity <= 0, hapus item dari cart
      if (item && quantity <= 0) {
        state.items = state.items.filter(i => i.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;