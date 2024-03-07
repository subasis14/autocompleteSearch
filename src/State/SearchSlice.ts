import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    searchData(state,payload) {
      return (state = payload);
    },
  },
});

export const { searchData } = SearchSlice.actions;
export default SearchSlice.reducer;
