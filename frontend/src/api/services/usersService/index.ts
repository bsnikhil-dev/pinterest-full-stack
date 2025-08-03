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

export const registerUser = async (userData: {
    username: string;
    displayName: string;
    email: string;
    password: string;
}): Promise<userDetails> => {
    try {
        const response = await apiClient.post<userDetails>(`/users/auth/register`, userData,
            { headers: { 'request-id': "REGISTER_REQUEST_ID" } });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (userData: { email: string; password: string; }): Promise<userDetails> => {
    try {
        const response = await apiClient.post<userDetails>(`/users/auth/login`, userData,
            { headers: { 'request-id': "LOGIN_REQUEST_ID" } });
        return response?.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const logOutUser = async () => {
    try {
        const response = await apiClient.post(`/users/auth/logout`);
        return response.data;
    } catch (error) {
        console.log(error)
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

export const addUserComment = async (comment: string, pin: string): Promise<string> => {
    try {
        const response = await apiClient.post(`/comments/addComment`, { description: comment, pin: pin });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }


}

export const followUser = async (userName: string): Promise<string> => {
    try {
        const response = await apiClient.post(`/users/follow/${userName}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }


}