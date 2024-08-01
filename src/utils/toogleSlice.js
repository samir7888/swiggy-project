import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
  name: "toogleSlice",
  initialState: {
    searchToogle: false,
    loginToogle : false,
  },
  reducers: {
    searchToogleBar: (state) => {
      state.searchToogle = !state.searchToogle;
    },
    toogleLogin : (state) => {
      state.loginToogle = !state.loginToogle;
    }
  },
});

export const { searchToogleBar, toogleLogin } = toogleSlice.actions;
export default toogleSlice.reducer;
