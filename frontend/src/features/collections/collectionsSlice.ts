import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCollectionsData } from "../../api/services/collectionsService";
import { AxiosError } from "axios";

interface Pin {
    _id: string;
    media: string;  // URL to the media
    width: number;
    height: number;
    title: string;
    description: string;
    link: string;
    board: string;
    tags: string[];
    user: string;
}

export interface Collection {
    _id: string;
    title: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    pinCount: number;
    firstPin: Pin;
}

interface CollectionsData {
    items: Collection[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const CollectionsInitialData: CollectionsData = {
    items: [],
    status: 'idle',
    error: null
}

export const fetchCollections = createAsyncThunk<Collection[], string, { rejectValue: string }>(
    "fetch/collections",
    async (userId, { rejectWithValue }) => {
        try {
            const data = await fetchCollectionsData(userId);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data || "An error occurred");
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

const CollectionsSlice = createSlice({
    name: "collections",
    initialState: CollectionsInitialData,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || null;
            })
    }
});

export default CollectionsSlice.reducer;