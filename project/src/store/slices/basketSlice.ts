import { createSlice } from "@reduxjs/toolkit";

import { IProductCardProps } from "../../interface";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getBasketFromStorage } from "../../utils/getBasketLocalStorage";

const { items, totalPrice } = getBasketFromStorage();

export interface BasketState {
    totalPrice: number,
    items: IProductCardProps[]
}
const initialState = {
    totalPrice,
    items,
} as BasketState

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addProduct(state, action) {
            const findItem = state.items.find(item => item.id === action.payload.id)

            if (findItem) {
                findItem.countProduct++;
            } else {
                state.items.push({
                    ...action.payload,
                    countProduct: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items)
        },

        minusProduct(state, action) {
            const findItem = state.items.find(item => item.id === action.payload);

            if (findItem) {
                if (findItem.countProduct > 0) {
                    findItem.countProduct--;
                    state.totalPrice = state.totalPrice - findItem.price;
                }
            }
        },

        removeProduct(state, action) {
            const findItem = state.items.find(item => item.id === action.payload);

            state.items = state.items.filter(item =>
                item.id !== action.payload
            )
            if (findItem) {
                state.totalPrice = state.totalPrice - (findItem.price * findItem.countProduct);
            }
        },
        clearProducts(state) {
            state.items = []
        },
    },
})

export const { addProduct, removeProduct, minusProduct, clearProducts } = basketSlice.actions;
export default basketSlice.reducer;