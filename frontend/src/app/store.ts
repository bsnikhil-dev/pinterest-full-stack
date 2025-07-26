import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../features/gallery/gallerySlice";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        post: postReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch