import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { userDetails } from "../../types";
import { loginUser, registerUser } from "../../api/services/usersService";
import { AxiosError } from "axios";

interface userAuthenticationState {
    user: userDetails;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialAuthState: userAuthenticationState = {
    user: {
        userId: "",
        displayName: "",
        username: "",
        email: ""
    },
    status: 'idle',
    error: null
}

export const registerUserThunk = createAsyncThunk<userDetails,
    {
        username: string;
        displayName: string;
        email: string;
        password: string;
    }, { rejectValue: string }>(
        "post/registerUser",
        async (userData, { rejectWithValue }) => {
            try {
                const response = await registerUser(userData);
                return response;
            } catch (error) {
                if (error instanceof AxiosError) {
                    return rejectWithValue(error.response?.data);
                }
                return rejectWithValue("An unknown error occurred")
            }
        }
    )

export const loginUserThunk = createAsyncThunk<userDetails, { email: string; password: string; }, { rejectValue: string; }>(
    "post/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await loginUser(userData);
            return response
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data)
            }
            return rejectWithValue("An unknown error occurred")
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
                state.status = "loading";
            })
            .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<userDetails>) => {
                state.status = "succeeded";
                state.user = action.payload;

            })
            .addCase(registerUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(loginUserThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserThunk.fulfilled, (state, action: PayloadAction<userDetails>) => {
                state.status = "succeeded";
                state.user = action.payload;

            })
            .addCase(loginUserThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    }
})

export default AuthSlice.reducer;