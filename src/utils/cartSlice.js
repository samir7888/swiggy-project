import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartData: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      //   console.log(action.payload);
      const { info, resInfo } = action.payload;
      // setCartData((prev) => [...prev, info]);
      state.cartData = [...state.cartData, info];
      state.resInfo = resInfo;
      localStorage.setItem("cartData", JSON.stringify(state.cartData));
      localStorage.setItem("resInfo", JSON.stringify(resInfo));
    },
    deleteItem: (state, action) => {
      state.cartData = action.payload;
      localStorage.setItem("cartData", JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartData = [];
      state.resInfo = [];
      localStorage.removeItem("cartData");
      localStorage.removeItem("resInfo");
    },
  },
});

export const { addToCart, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
