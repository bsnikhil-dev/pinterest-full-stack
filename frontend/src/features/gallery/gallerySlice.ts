import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchGalleryItems } from "../../api/services/galleryService";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { AxiosError } from "axios";
import { resetError, setErrorFromPayload } from "../../utils/commonUtils";

interface GalleryItemsState {
    items: GalleryResponse,
    status: boolean | null;
    error: {
        code: number | null; message: string | null
    };
}

const initialState: GalleryItemsState = {
    items: [],
    status: null,
    error: { code: null, message: null }
}

export interface FetchGalleryPayload {
    searchQuery?: string;
    userId?: string;
    collectionId?: string;
}

export const fetchGallery = createAsyncThunk<GalleryResponse, FetchGalleryPayload, { rejectValue: { code: number; message: string } }>(
    'data/fetchGallery',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchGalleryItems(payload);
            return response;
        } catch (error: any) {

            if (error instanceof AxiosError) {
                return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
            }
            // console.log(error)
            return rejectWithValue({ code: error?.response?.status as number, message: error?.response?.data.message });
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
                state.items = [];
                resetError(state);
            })
            .addCase(fetchGallery.fulfilled, (state, action: PayloadAction<GalleryResponse>) => {

                state.status = false;
                state.items = action.payload;
                resetError(state);
            })
            .addCase(fetchGallery.rejected, (state, action) => {

                state.status = false;
                state.items = [];
                setErrorFromPayload(state, action.payload);
            })
    }
});

export default gallerySlice.reducer