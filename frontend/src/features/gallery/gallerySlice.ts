import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchGalleryItems } from "../../api/services/galleryService";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { AxiosError } from "axios";


interface GalleryItemsState {
    items: GalleryResponse,
    status: boolean | null;
    error: string | null;
}

const initialState: GalleryItemsState = {
    items: [],
    status: null,
    error: null
}

export interface FetchGalleryPayload {
    searchQuery?: string;
    userId?: string;
    collectionId?: string;
}

export const fetchGallery = createAsyncThunk<GalleryResponse, FetchGalleryPayload, { rejectValue: { message: string } }>(
    'data/fetchGallery',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchGalleryItems(payload);
            return response;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
            return rejectWithValue(error.response?.data);
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
                state.status = true;
            })
            .addCase(fetchGallery.fulfilled, (state, action: PayloadAction<GalleryResponse>) => {

                state.status = false;
                state.items = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {

                state.status = null;
                state.error = action.payload?.message as string;

            })
    }
});

export default gallerySlice.reducer