import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, fetchUserComments } from "../../api/services/usersService";
import { AxiosError } from "axios";
import type { UserComment } from "../../types";

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
    comments: UserComment[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const UserInitialState: UserState = {
    user: null,
    comments: null,
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

export const fetchUserCommentsData = createAsyncThunk<UserComment[], string, { rejectValue: string }>(
    "fetch/userComments",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetchUserComments(userId);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue("");
        }
    }
);

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
            .addCase(fetchUserCommentsData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserCommentsData.fulfilled, (state, action: PayloadAction<UserComment[]>) => {
                state.comments = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUserCommentsData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    }
});

export default UserSlice.reducer;