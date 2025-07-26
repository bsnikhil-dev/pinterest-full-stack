import { type GalleryResponse } from "./galleryService.types";
import apiClient from "../../axios";

export const fetchGalleryItems = async (query: string | undefined): Promise<GalleryResponse> => {
    try {
        const url = query ? `/pins?query=${query}` : `/pins`;

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