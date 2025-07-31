import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../features/gallery/gallerySlice";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/useSlice";
import collectionsReducer from "../features/collections/collectionsSlice";
import authenticationReducer from "../features/authentication/authentication";

export const store = configureStore({
    reducer: {
        gallery: galleryReducer,
        post: postReducer,
        user: userReducer,
        collections: collectionsReducer,
        authentication: authenticationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch