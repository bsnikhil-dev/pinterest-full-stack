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
        'request-id': 'LOGIN_REQUEST_ID',
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

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return generateHeaders(config);
    },
    (error) => Promise.reject(error)
);

export default apiClient;