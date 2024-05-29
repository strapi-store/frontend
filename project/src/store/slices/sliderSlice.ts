import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ky from "ky";
import { ISlider, IStrapi } from "../../interface";
import { token } from "../../helpers";



export const fetchSliders = createAsyncThunk(
    'sliders/fetchSliders',
    async () => {
        try {
            const data: IStrapi<ISlider> = await ky.get("https://necessary-morning-57a2ae1418.strapiapp.com/api/banners?populate=*", {
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

interface SlidersState {
    sliders: ISlider[]
    status: null | 'loading' | 'resolved'
    error: null
}
const initialState = {
    sliders: [],
    status: null,
    error: null,
} as SlidersState

const sliderSlice = createSlice({
    name: 'sliders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSliders.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSliders.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.sliders = action.payload as ISlider[];
            })
    },
})


export default sliderSlice.reducer;