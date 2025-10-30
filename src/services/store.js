// src/services/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import generalReducer from "./reducers/generalReducer";
import cartReducer from "./reducers/cartReducer";

export const store = configureStore({
  reducer: {
    // register your slice under a stable key
    general: generalReducer.reducer,
    cart: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

setupListeners(store.dispatch);
