import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { AxiosError } from "axios";
import { fetchPost } from "../../api/services/galleryService";
import { resetError, setErrorFromPayload } from "../../utils/commonUtils";

interface PostItem {
    items: GalleryResponse,
    status: boolean;
    error: { code: number | null; message: string | null };
}

const initialPost: PostItem = {
    items: [],
    status: false,
    error: { code: null, message: null }
}

export const fetchPostData = createAsyncThunk<GalleryResponse, string, { rejectValue: { code: number; message: string } }>(
    "fetch/post",
    async (params, { rejectWithValue }) => {
        try {
            const response = await fetchPost(params);
            return response;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
            }
            return rejectWithValue({ code: error?.response?.status as number, message: error?.response?.data.message });
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
                state.status = true;
                state.items = [];
                resetError(state);
            })
            .addCase(fetchPostData.fulfilled, (state, action: PayloadAction<GalleryResponse>) => {
                state.status = false;
                state.items = action.payload;
                resetError(state);
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                state.status = false;
                state.items = []
                setErrorFromPayload(state, action.payload);
            })
    }

});

export default PostSlice.reducer;