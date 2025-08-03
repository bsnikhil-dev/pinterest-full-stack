import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchUser, fetchUserComments } from "../../api/services/usersService";
import { AxiosError } from "axios";
import type { UserComment } from "../../types";
import { resetError, setErrorFromPayload } from "../../utils/commonUtils";

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
    status: boolean | null;
    error: {
        code: number | null; message: string | null
    };
};

const UserInitialState: UserState = {
    status: null,
    user: null,
    comments: null,
    error: { code: null, message: null }
};

export const fetchUserData = createAsyncThunk<UserData, string, { rejectValue: { code: number; message: string } }>(
    "fetch/userData",
    async (username, { rejectWithValue }) => {
        try {
            const response = await fetchUser(username);
            return response;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
            }
            return rejectWithValue({ code: error?.response?.status as number, message: error?.response?.data.message });
        }
    }
)

export const fetchUserCommentsData = createAsyncThunk<UserComment[], string, { rejectValue: { code: number; message: string } }>(
    "fetch/userComments",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetchUserComments(userId);
            return response;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
            }
            return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
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
                state.status = true;
                state.user = null;
                state.comments = null;
                resetError(state);
            })
            .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.status = false;
                state.user = action.payload;
                resetError(state);
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = false;
                state.user = null;
                setErrorFromPayload(state, action.payload);
            })
            .addCase(fetchUserCommentsData.pending, (state) => {
                state.status = true;
                state.user = null;
                state.comments = null;
                resetError(state);
            })
            .addCase(fetchUserCommentsData.fulfilled, (state, action: PayloadAction<UserComment[]>) => {
                state.status = false;
                state.comments = action.payload;
                resetError(state);
            })
            .addCase(fetchUserCommentsData.rejected, (state, action) => {
                state.status = false;
                state.user = null;
                state.comments = null;
                setErrorFromPayload(state, action.payload);
            })
    }
});

export default UserSlice.reducer;