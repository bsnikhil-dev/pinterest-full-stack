import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchGalleryItems } from "../../api/services/galleryService";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";


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

export const fetchGallery = createAsyncThunk<GalleryResponse, void, { rejectValue: string }>(
    'gallery/fetchGalleryItems',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchGalleryItems();
            return response;
        } catch (error: any) {
            return rejectWithValue(error?.message || "Failed to fetch gallery items");
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
                state.error = action.payload as string;
            })
    }
});

export default gallerySlice.reducer