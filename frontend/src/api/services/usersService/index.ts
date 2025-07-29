import type { UserData } from "../../../features/user/useSlice";
import type { UserComment } from "../../../types";
import apiClient from "../../axios";


export const fetchUser = async (username: string): Promise<UserData> => {
    try {
        const response = await apiClient.get<UserData>(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const fetchUserComments = async (userId: string): Promise<UserComment[]> => {
    try {
        const response = await apiClient.get<UserComment[]>(`/comments/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}