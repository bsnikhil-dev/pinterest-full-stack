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
    timeout: 5000,
});


const getHeaders = (subKey: string) => {
    return {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Ocp-Apim-Subscription-Key': subKey,
        'Correlationid': '9f5bcfab-ecea-4ae3-a24e-4a4b9745f513',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    }
}

const generateHeaders = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {

    const newHeaders = AxiosHeaders.from({
        ...config.headers,
        ...getHeaders("1234567890abcdef1234567890abcdef"),
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