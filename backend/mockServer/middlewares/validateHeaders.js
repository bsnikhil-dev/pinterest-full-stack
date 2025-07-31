const SUBSCRIPTION_KEY = "1234567890abcdef1234567890abcdef";
const REGISTER_REQUEST_ID = "REGISTER_REQUEST_ID";
const LOGIN_REQUEST_ID = "LOGIN_REQUEST_ID";

export const validateHeaders = (endpointType) => (req, res, next) => {
    const requiredHeaders = [
        'ocp-apim-subscription-key',
        'correlationid',
        'accept',
        'token',
        'content-type',
        'request-id',
    ];

    const missingHeaders = requiredHeaders.filter((header) => !req.headers[header]);
    const requestId = req.headers['request-id']; // get it from headers

    if (missingHeaders.length > 0) {
        return res.status(400).json({
            message: `Missing required header(s): ${missingHeaders.join(', ')}`,
            code: 'MISSING_HEADERS',
        });
    }

    // Validate subscription key
    const receivedKey = req.headers['ocp-apim-subscription-key'];
    
    if (receivedKey !== SUBSCRIPTION_KEY) {
         console.log(receivedKey)
        return res.status(403).json({
            message: 'Invalid subscription key',
            code: 'INVALID_SUBSCRIPTION_KEY',
        });
    }


    if (endpointType === 'register' && requestId !== REGISTER_REQUEST_ID) {
        return res.status(400).json({
            message: 'Invalid request-id.',
            code: 'INVALID_REGISTER_REQUEST_ID',
        });
    }

    if (endpointType === 'login' && requestId !== LOGIN_REQUEST_ID) {
        return res.status(400).json({
            message: 'Invalid request-id.',
            code: 'INVALID_LOGIN_REQUEST_ID',
        });
    }

    // Optionally attach correlationId to request for logging
    req.correlationId = req.headers['correlationid'];
    req.requestId = requestId;
    next();
};
