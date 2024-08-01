import { configureStore } from "@reduxjs/toolkit";
import toogleSlice from "./toogleSlice";
import cartSlice from "./cartSlice";
import coordinatesSlice from "./coordinatesSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    toogleSlice: toogleSlice,
    cartSlice: cartSlice,
    coordinatesSlice: coordinatesSlice,
    filterSlice: filterSlice,
    authSlice:authSlice
  },
});

export default store;
