import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/userSlice";
import postSlice from "./Features/postSlice";
// import
const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice
  },
});

export default store;