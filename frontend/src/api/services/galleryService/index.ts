import { type GalleryResponse } from "./galleryService.types";
import apiClient from "../../axios";


export const fetchGalleryItems = async (): Promise<GalleryResponse> => {
    try {
        const response = await apiClient.get<GalleryResponse>('/pins');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch gallery items:", error);
        throw error;
    }
} 