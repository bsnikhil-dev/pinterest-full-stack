import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUser } from "../../api/services/galleryService";
import { AxiosError } from "axios";

export interface UserData {
    _id: string;
    displayName: string;
    username: string;
    email: string;
    img: string;
    followerCount: number;
    followingCount: number;
}

interface UserState {
    user: UserData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const UserInitialState: UserState = {
    user: null,
    status: "idle",
    error: null,
};

export const fetchUserData = createAsyncThunk<UserData, string, { rejectValue: string }>(
    "fetch/userData",
    async (username, { rejectWithValue }) => {
        try {
            const response = await fetchUser(username);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)

const UserSlice = createSlice({
    name: "user",
    initialState: UserInitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    }
});

export default UserSlice.reducer;