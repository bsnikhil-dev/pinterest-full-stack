import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchGalleryItems } from "../../api/services/galleryService";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { AxiosError } from "axios";


interface GalleryItemsState {
    items: GalleryResponse,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: GalleryItemsState = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchGallery = createAsyncThunk<GalleryResponse, string | undefined, { rejectValue: { message: string } }>(
    'data/fetchGallery',
    async (query, { rejectWithValue }) => {
        try {
            const response = await fetchGalleryItems(query);
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue({ message: "An unknown error occurred" });
        }
    }
)


export const gallerySlice = createSlice({
    name: "gallery",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGallery.fulfilled, (state, action: PayloadAction<GalleryResponse>) => {

                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message as string;
            })
    }
});

export default gallerySlice.reducer