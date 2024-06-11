import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import ky from "ky";
import { AuthUser, IUser, IUserData, UpdateUserData } from "../../interface";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

const token = getCookie('token');

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${token}`);

interface UserState {
    status: null | 'loading' | 'resolved',
    error: null,
    token: string | null,
}
const initialState = {
    status: null,
    error: null,
    token: token ? token : null,
} as UserState


const options = {
    path: '/',
    expires: "Tue, 19 Jan 2038 03: 14:07 GMT"
};

export const authUser = createAsyncThunk(
    'user/authUser',
    async (user: AuthUser) => {
        try {
            const data: IUserData = await ky.post("https://sparkling-spirit-05e365a043.strapiapp.com/api/auth/local", {
                json: user
            }).json();
            localStorage.setItem('userData', JSON.stringify(data.user))
            setCookie('token', data.jwt, options)
            return data;
        } catch (err) {
            console.log(err);
        }
    },
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (newUser: IUser) => {
        try {
            const data: IUserData = await ky.post("https://sparkling-spirit-05e365a043.strapiapp.com/api/auth/local/register", { json: newUser }).json();
            console.log(data)
            return data;
        } catch (err) {
            console.log(err);
        }
    },
)

export const updateUserData = createAsyncThunk(
    'user/registerUser',
    async (userData: UpdateUserData) => {
        try {
            const data: IUserData = await ky.post("https://sparkling-spirit-05e365a043.strapiapp.com/api/auth/local/change-password", { json: userData, headers: myHeaders }).json();
            console.log(data)
            return data;
        } catch (err) {
            console.log(err);
        }
    },
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        removeUser(state) {
            state.token = null;
            deleteCookie("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.token = action.payload?.jwt as string;
            })
    },
})

export const { removeUser } = userSlice.actions;
export default userSlice.reducer;