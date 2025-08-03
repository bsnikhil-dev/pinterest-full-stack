import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Not authenticated!", code: "AUTH_TOKEN_MISSING" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired.",
                    code: "TOKEN_EXPIRED"
                });
            }
            return res.status(403).json({
                message: "Token is invalid!",
                code: "INVALID_TOKEN"
            });
        }
        req.userId = payload.userId;
        next();
    });
};