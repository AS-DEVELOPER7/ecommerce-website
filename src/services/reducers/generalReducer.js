// src/services/reducers/generalReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_KEYS } from "../../constants";

const initialState = {
  selectedCategory: CATEGORY_KEYS.ALL,
};

const generalReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = generalReducer.actions;

export default generalReducer;
