import type { Collection } from "../../../features/collections/collectionsSlice";
import apiClient from "../../axios";

export const fetchCollectionsData = async (userId: string): Promise<Collection[]> => {
    try {
        const response = await apiClient.get<Collection[]>(`/collections/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}