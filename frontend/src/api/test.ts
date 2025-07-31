import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
} from 'axios';
import { CONSTANTS } from '../../constants';
import { CustomAxiosRequestConfig, CustomNavigateProps } from '../../types';
import {
    isColleague,
    navigateOutOfJourney,
    getAccessTokenByRefreshToken,
    isDevEnv,
} from '../../utils/Common';
import { getHeaders, setAccessToken, setRefreshToken } from '../../services/auth';

// instance: A configured Axios instance

const instance: AxiosInstance = axios.create({
    withCredentials: isDevEnv(), // Ensures cookies and other credentials are sent with the request (checked using the isDevEnv() function).
    headers: { 'Content-Type': 'application/json' }, //Sets a default Content-Type of application/json for requests.
    timeout: Number(process.env.API_TIMEOUT), //Sets the timeout for requests, using an environment variable API_TIMEOUT.
    retry: 3, // Sets the number of retry attempts (default 3).
    retryDelay: 10000, // Sets the delay (10,000 ms or 10 seconds) between retry attempts.
} as CustomAxiosRequestConfig); // The as CustomAxiosRequestConfig part is used to cast the config to your custom CustomAxiosRequestConfig type for type safety.

// Another Axios instance that has similar settings, but the withCredentials is always set to true.

export const customInstance: AxiosInstance = axios.create({
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: Number(process.env.API_TIMEOUT),
});

//generateHeaders is a function that adds headers to the request.
const generateHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
    let useColleagueSubscriptionKey: boolean = false; // Checks if the request URL contains a specific string (/vl/access-summary?applicationIds), which seems to determine if a colleague’s subscription key should be included.
    if (config && config.url) {
        useColleagueSubscriptionKey = config.url.includes('/vl/access-summary?applicationIds');
    }
    //It then returns the request config with the appropriate headers added using the getHeaders function (passing whether to include the subscription key).
    return {
        ...config,
        headers: {
            ...config.headers,
            ...getHeaders(useColleagueSubscriptionKey),
        },
    };
};

// noErrorResponseHandler: Handles cases where the request failed but didn’t return a valid response (e.g., network failure).
// It creates a custom error with a 500 status code and a message from the CONSTANTS.unexpectedOutageMessage, then rejects the promise with that error.
const noErrorResponseHandler = async (
    err: AxiosError
): Promise<AxiosResponse<any, any>> => {
    const customError = {
        ...err,
        response: { status: 500, statusText: CONSTANTS.unexpectedOutageMessage },
    };
    return Promise.reject(customError);
};

// isRateLimitExceeded checks if the message in the error response contains keywords related to a rate limit being exceeded (e.g., too many requests in a short period).
function isRateLimitExceeded(Message: string) {
    return (
        Message.includes(CONSTANTS.rateLimitExceeded) &&
        Message.includes(CONSTANTS.rateLimitHttpText) &&
        Message.includes(CONSTANTS.rateLimitHttpCode)
    );
}

// shouldReject: Determines whether a request should be rejected based on certain error conditions:
// Status 500 or 429 (server or rate limit errors).
// If rate limit exceeded and retries are not exhausted (retry count isn't 3).
function shouldReject(status: number, Message: string, config: AxiosRequestConfig) {
    return (
        status === 500 || status === 429 ||
        (!isRateLimitExceeded(Message) && config.retry !== 3)
    );
}

// shouldRefreshToken: Checks if the status is 401 (Unauthorized) and if the error message indicates that the JWT or access token has expired.
function shouldRefreshToken(status: number, Message: string) {
    return (
        status === 401 &&
        (Message.includes(CONSTANTS.jwtExpiryMessage) ||
            Message.includes(CONSTANTS.accessTokenExpired))
    );
}

// handleTokenRefresh: Handles refreshing the access token:
// If the user is a colleague (isColleague()), it calls a function (getAccessTokenByRefreshToken) to get a new access token.
// If a new token is returned, it stores the AccessToken and RefreshToken.
// After refreshing, it regenerates the headers with the new token.
async function handleTokenRefresh(config: AxiosRequestConfig) {
    if (isColleague()) {
        const response = await getAccessTokenByRefreshToken();
        if (response.AccessToken) {
            setAccessToken(response.AccessToken);
            setRefreshToken(response.RefreshToken);
        }
    }
    generateHeaders(config);
}

export const errorFunction = async (
    err: AxiosError
): Promise<AxiosResponse<any, any>> => {
    if (!err.response) {
        console.log('inside no error response block', err); // eslint-disable-line no-console
        return noErrorResponseHandler(err);
    }

    const { config, status, statusText } = err.response;
    if (!config || !config.retry) {
        return Promise.reject(err);
    }

    if (
        !CONSTANTS.apiRetryTypes.includes(statusText) &&
        status !== 429 &&
        status !== 401
    ) {
        return Promise.reject(err);
    }

    const { Message } = err.response.data.Error[0];
    if (shouldReject(status, Message, config)) {
        return Promise.reject(err);
    }

    if (shouldRefreshToken(status, Message)) {
        await handleTokenRefresh(config);
    }

    const newConfig = { ...config, retry: config.retry - 1 };
    const delayRetryRequest = new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
    });

    await delayRetryRequest;
    return instance(newConfig);
};

export const customInstanceResponse = async (
    res: AxiosResponse
): Promise<AxiosResponse<any, any>> => {
    if (!res.request.responseURL.includes(res.config.url)) {
        // eslint-disable-line no-console
        console.log('No response found! No ISESSION detected!!');
        navigateOutOfJourney(process.env.REDIRECT_TO_LOGOUT_PAGE, 'logout');
    }
    return res;
};

instance.interceptors.request.use(generateHeaders);

instance.interceptors.response.use(undefined, errorFunction);

customInstance.interceptors.response.use(customInstanceResponse);

export const onError = (
    error: AxiosError,
    navigate: CustomNavigateProps,
): void => {
    let errData = { ...error };
    if (errData.response === undefined) {
        errData = { ...errData, response: { status: 500 } as AxiosResponse };
    }
    navigate('/error', {
        state: {
            status: errData.response?.status || 500,
            statusText: errData.response?.statusText,
        },
    });
};

export default instance;
