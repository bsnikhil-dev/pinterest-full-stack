import { type GalleryResponse } from "./galleryService.types";
import apiClient from "../../axios";
import type { UserData } from "../../../features/user/useSlice";
import type { FetchGalleryPayload } from "../../../features/gallery/gallerySlice";

export const fetchGalleryItems = async (payload: FetchGalleryPayload | undefined): Promise<GalleryResponse> => {
    try {


        let queryString: string = "";

        if (payload?.searchQuery) {
            queryString = `query=${payload.searchQuery}`
        }

        if (payload?.userId) {
            queryString = `userId=${payload.userId}`
        }

        if (payload?.collectionId) {
            queryString = `collectionId=${payload.collectionId}`
        }

        let url: string;

        payload ? url = `/pins?${queryString}` : url = "/pins";

        // const url = payload ? `/pins?query=${payload.searchQuery}&userId=${payload.userId}` : `/pins`;

        const response = await apiClient.get<GalleryResponse>(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchPost = async (params: string): Promise<GalleryResponse> => {
    try {
        const response = await apiClient.get<GalleryResponse>(`/pins/${params}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchUser = async (username: string): Promise<UserData> => {
    try {
        const response = await apiClient.get<UserData>(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}