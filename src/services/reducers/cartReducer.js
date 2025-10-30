import { createSlice, nanoid } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    items: [],
    address: {
      name: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      country: "",
    },
    payment: {
      method: "cash",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
    orderSummary: {
      subtotal: 0,
      total: 0,
      shipping: 0,
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.qty += item.qty || 1;
      } else {
        state.items.push({ ...item, cartId: nanoid(), qty: item.qty || 1 });
      }
      cartReducer.caseReducers.recalculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.cartId !== action.payload);
      cartReducer.caseReducers.recalculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { cartId, qty } = action.payload;
      const item = state.items.find((i) => i.cartId === cartId);
      if (item) item.qty = qty;
      cartReducer.caseReducers.recalculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      cartReducer.caseReducers.recalculateTotals(state);
    },
    setAddress: (state, action) => {
      state.address = { ...state.address, ...action.payload };
    },
    setPayment: (state, action) => {
      state.payment = { ...state.payment, ...action.payload };
    },
    recalculateTotals: (state) => {
      const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const shipping = subtotal > 100 ? 0 : 5;
      const total = subtotal + shipping;
      state.orderSummary = { subtotal, shipping, total };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setAddress,
  setPayment,
  recalculateTotals,
} = cartReducer.actions;
export default cartReducer;
