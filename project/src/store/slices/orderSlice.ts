import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ky from "ky";
import { IOrders, IStrapi, PostOrder } from "../../interface";

interface OrderState {
    status: null | 'loading' | 'resolved',
    error: null,
    orders: IOrders[]
}

const initialState = {
    status: null,
    error: null,
    orders: []
} as OrderState

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        try {
            const data: IStrapi<IOrders> = await ky.get("https://sparkling-spirit-05e365a043.strapiapp.com//api/orders/?populate=*").json();
            return data.data;
        } catch (err) {
            console.log(err);
        }
    },
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (newOrder: PostOrder) => {
        try {
            const data: IOrders = await ky.post("https://sparkling-spirit-05e365a043.strapiapp.com//api/orders", { json: newOrder }).json();
            console.log(data)
            return data;
        } catch (err) {
            console.log(err);
        }
    },
)

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.orders = action.payload as IOrders[]
            })
    },
})

export default orderSlice.reducer;