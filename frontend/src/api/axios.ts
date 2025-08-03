import axios,
{
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    AxiosError,
    AxiosHeaders
} from 'axios';
import { refreshAccessToken } from './services/authService';

const PUBLIC_ROUTES = ['/users/auth/register', '/users/auth/login', "/users/auth/refresh", "/users/auth/logout"];

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
});

const getHeaders = (subKey: string, config: InternalAxiosRequestConfig) => {

    const publicRoute = checkPublicRoute(config.url)

    const token = sessionStorage.getItem("token");

    return {
        'ocp-apim-subscription-key': subKey,
        'correlationid': '9f5bcfab-ecea-4ae3-a24e-4a4b9745f513',
        'content-type': 'application/json',
        'accept': 'application/json',
        ...(publicRoute && token && { Authorization: `Bearer ${token}` }),
    }
}

const generateHeaders = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    const newHeaders = AxiosHeaders.from({
        ...getHeaders("1234567890abcdef1234567890abcdef", config),
        ...config.headers,
    });

    return {
        ...config,
        headers: newHeaders,
    };
}

const noErrorResponseHandler = async (err: AxiosError) => {
    const customError = {
        ...err,
        response: {
            status: 500,
            statusText: "Network Error",
            data: {
                message: "An Unexpected Error Occured!",
            }

        },
    };
    return Promise.reject(customError);
};

const handleTokenRefresh = async (config: InternalAxiosRequestConfig) => {
    try {
        const { accessToken } = await refreshAccessToken();
        if (accessToken) {
            sessionStorage.setItem("token", accessToken);
        }
        const updatedHeaders = AxiosHeaders.from(config.headers);
        updatedHeaders.set('Authorization', `Bearer ${accessToken}`);

        config.headers = updatedHeaders;
        return apiClient(config);
    } catch (error) {
        handleSessionTimeout();
        return Promise.reject(error);
    }
}

function handleSessionTimeout() {
    sessionStorage.removeItem("token")
}


const errorFunction = async (error: AxiosError) => {
    if (!error.response) {
        return noErrorResponseHandler(error);
    }

    const { code } = error.response?.data as { code: string };
    const { config, status } = error.response;

    if ((status === 401 && code === "TOKEN_EXPIRED") || (status === 403 && code === "INVALID_TOKEN")) {
        return handleTokenRefresh(config);
    }

    return Promise.reject(error); // Re-throw error if it has a response
}

function checkPublicRoute(url?: string): boolean {
    if (!url) return false;
    return !PUBLIC_ROUTES.some((publicPath) => url.includes(publicPath));
}

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return generateHeaders(config);
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use((response) => response, errorFunction)
export default apiClient;