// src/services/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import generalReducer from "./reducers/generalReducer";
import cartReducer from "./reducers/cartReducer";
import { productsApi } from "./api/productsApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    // register your slice under a stable key
    general: generalReducer.reducer,
    cart: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(productsApi.middleware),
});

setupListeners(store.dispatch);
