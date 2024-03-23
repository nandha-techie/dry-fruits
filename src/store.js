import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducer/cartSlice";

export const store = configureStore({
    reducer: {
        allCart: cartSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})