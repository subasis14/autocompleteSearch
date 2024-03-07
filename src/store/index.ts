import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "../State/SearchSlice";

export const Store = configureStore({
  reducer: {
    search: SearchSlice,
  },
});
