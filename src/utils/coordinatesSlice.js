import { createSlice } from "@reduxjs/toolkit";

const coordinatesSlice = createSlice({
  name: "coordinatesSlice",
  initialState: {
    lat: 19.0748,
    lng: 72.8856,
  },
  reducers: {
    setCoord: (state, action) => {
      const data = action.payload;
      console.log(data);
      state.lat = data.data[0].geometry.location.lat;
      state.lng = data.data[0].geometry.location.lng;
    },
  },
});

export default coordinatesSlice.reducer;
export const { setCoord } = coordinatesSlice.actions;
