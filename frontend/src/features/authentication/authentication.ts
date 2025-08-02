import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userDetails } from "../../types";
import { loginUser, registerUser } from "../../api/services/usersService";
import { AxiosError } from "axios";

interface userAuthenticationState {
    user: userDetails;
    status: boolean | null;
    error: string | null;
    isAuthenticated: boolean | null;
}

const initialAuthState: userAuthenticationState = {
    user: {
        userId: "",
        displayName: "",
        username: "",
        email: "",
        token: "",
    },
    status: null,
    error: null,
    isAuthenticated: null,
}

export const registerUserThunk = createAsyncThunk<userDetails,
    {
        username: string;
        displayName: string;
        email: string;
        password: string;
    }, { rejectValue: { message: string } }>(
        "post/registerUser",
        async (userData, { rejectWithValue }) => {
            try {
                const response = await registerUser(userData);
                return response;
            } catch (error: any) {
                if (error instanceof AxiosError) {
                    return rejectWithValue(error.response?.data);
                }
                return rejectWithValue(error.response?.data)
            }
        }
    )

export const loginUserThunk = createAsyncThunk<userDetails, { email: string; password: string; }, { rejectValue: { message: string; } }>(
    "post/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            return response
        } catch (error: any) {
            if (error instanceof AxiosError) {

                return rejectWithValue(error.response?.data)
            }

            return rejectWithValue(error.response?.data)
        }
    }
)

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, (state) => {
                state.status = true;
            })
            .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<userDetails>) => {
                state.status = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload?.message as string;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.status = true;
            })
            .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<userDetails>) => {
               
                state.status = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                
            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload?.message as string;
            })
    }
})

export default AuthSlice.reducer;