"use client";
import { configureStore } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
