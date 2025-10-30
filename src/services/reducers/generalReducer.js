// src/services/reducers/generalReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_KEYS } from "../../constants";

const initialState = {
  products: [],
  categories: [],
  searchQuery: "",
  selectedCategory: CATEGORY_KEYS.ALL,
  filters: {
    materials: [],
    styles: [],
    maxPrice: 9999,
    sort: "featured",
  },
};

const generalReducer = createSlice({
  name: "general",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.selectedCategory = CATEGORY_KEYS.ALL;
      state.searchQuery = "";
    },
  },
});

export const {
  setProducts,
  setCategories,
  setSearchQuery,
  setCategory,
  setFilter,
  resetFilters,
} = generalReducer.actions;

export default generalReducer;
