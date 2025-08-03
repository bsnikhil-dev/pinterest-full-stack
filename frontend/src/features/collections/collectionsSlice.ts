import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchCollectionsData } from "../../api/services/collectionsService";
import { AxiosError } from "axios";
import { resetError, setErrorFromPayload } from "../../utils/commonUtils";

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
    status: boolean | null;
    items: Collection[];
    error: { code: number | null; message: string | null };
}

const CollectionsInitialData: CollectionsData = {
    status: null,
    items: [],
    error: { code: null, message: null }
}

export const fetchCollections = createAsyncThunk<Collection[], string, { rejectValue: { code: number; message: string } }>(
    "fetch/collections",
    async (userId, { rejectWithValue }) => {
        try {
            const data = await fetchCollectionsData(userId);
            return data;
        } catch (error: any) {
            if (error instanceof AxiosError) {
                return rejectWithValue({ code: error?.status as number, message: error?.response?.data.message });
            }
            return rejectWithValue({ code: error?.response?.status as number, message: error?.response?.data.message });
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
                state.status = true;
                state.items = [];
                resetError(state);
            })
            .addCase(fetchCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
                state.status = false;
                state.items = action.payload;
                resetError(state);
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.status = false;
                state.items = []
                setErrorFromPayload(state, action.payload);
            })
    }
});

export default CollectionsSlice.reducer;