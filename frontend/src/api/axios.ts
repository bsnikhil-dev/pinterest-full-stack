import axios,
{
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosResponse, AxiosError,
    type AxiosRequestConfig,
    AxiosHeaders
} from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
});


const getHeaders = (subKey: string) => {
    return {
        'ocp-apim-subscription-key': subKey,
        'correlationid': '9f5bcfab-ecea-4ae3-a24e-4a4b9745f513',
        'content-type': 'application/json',
        'accept': 'application/json',
    }
}

const generateHeaders = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    const newHeaders = AxiosHeaders.from({
        ...getHeaders("1234567890abcdef1234567890abcdef"),
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

const errorFunction = (error: AxiosError) => {
    if (!error.response) {
        return noErrorResponseHandler(error);
    }
    const { status } = error.response;

    // if (status !== 401) {
    return Promise.reject(error); // Re-throw error if it has a response
    // }

}

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return generateHeaders(config);
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(undefined, errorFunction)
export default apiClient;