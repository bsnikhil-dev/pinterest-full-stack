import apiClient from "../../axios"

export const refreshAccessToken = async () => {
    try {
        const response = await apiClient.post(`/users/auth/refresh`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}