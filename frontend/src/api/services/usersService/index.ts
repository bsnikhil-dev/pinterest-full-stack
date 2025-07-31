import type { UserData } from "../../../features/user/useSlice";
import type { UserComment, userDetails } from "../../../types";
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

export const registerUser = async (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
}): Promise<userDetails> => {
    try {
        const response = await apiClient.post<userDetails>(`/users/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (userData: { email: string; password: string; }): Promise<userDetails> => {
    try {
        const response = await apiClient.post<userDetails>(`/users/auth/login`, userData);
        return response.data;
    } catch (error) {
        console.log("Axios")
        throw error;
    }
}