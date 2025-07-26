import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { AxiosError } from "axios";
import { fetchPost } from "../../api/services/galleryService";

interface PostItem {
    items: GalleryResponse,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialPost: PostItem = {
    items: [],
    status: "idle",
    error: null
}

export const fetchPostData = createAsyncThunk<GalleryResponse, string, { rejectValue: string }>(
    "fetch/post",
    async (params, { rejectWithValue }) => {
        try {
            const response = await fetchPost(params);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)

const PostSlice = createSlice({
    name: "post",
    initialState: initialPost,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchPostData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostData.fulfilled, (state, action: PayloadAction<GalleryResponse>) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
    }

});

export default PostSlice.reducer;