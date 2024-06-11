import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";
import { IProduct, IStrapi } from "../../interface";
import { token } from "../../helpers";



export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        try {
            const data: IStrapi<IProduct> = await ky.get("https://sparkling-spirit-05e365a043.strapiapp.com//api/products?populate=*", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).json();
            return data.data;
        } catch (err) {
            console.log(err);
        }
    },
)

interface ProductsState {
    searchProducts: IProduct[],
    products: IProduct[]
    status: null | 'loading' | 'resolved'
    error: null
}
const initialState = {
    searchProducts: [],
    products: [],
    status: null,
    error: null,
} as ProductsState

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProducts: (state, action) => {
            state.searchProducts = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.products = action.payload as IProduct[];
            })
    },
})

export const { searchProducts } = productSlice.actions
export default productSlice.reducer;