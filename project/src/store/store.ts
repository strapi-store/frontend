import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import categorySlice from "./slices/categorySlice";
import sliderSlice from "./slices/sliderSlice";
import productSlice from "./slices/productSlice";
import basketSlice from "./slices/basketSlice";
import orderSlice from "./slices/orderSlice";


export const store = configureStore({
    reducer: {
        categories: categorySlice,
        user: userSlice,
        sliders: sliderSlice,
        products: productSlice,
        basket: basketSlice,
        orders: orderSlice,

    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;