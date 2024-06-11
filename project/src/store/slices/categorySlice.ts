import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";
import { ICategory, IStrapi } from "../../interface";
import { token } from "../../helpers";



export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        try {
            const data: IStrapi<ICategory> = await ky.get("https://sparkling-spirit-05e365a043.strapiapp.com/api/categories?populate[products][populate][gallery][fields][0]=%2A&populate[products][populate][avatar][fields][0]=%2A&populate[categoryImage][fields][0]=%2A", {
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

interface CategoriesState {
    categories: ICategory[]
    status: null | 'loading' | 'resolved'
    error: null
}
const initialState = {
    categories: [],
    status: null,
    error: null,
} as CategoriesState

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.categories = action.payload as ICategory[];
            })
    },
})


export default categorySlice.reducer;