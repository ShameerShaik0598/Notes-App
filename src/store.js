//create store
import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./userLoginSlice";

const store = configureStore({
  reducer: {
    user: userLoginSlice,
  },
});

export default store;
