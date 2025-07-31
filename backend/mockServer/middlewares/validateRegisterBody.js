export const validateRegisterBody = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Missing required fields: username, email, or password.",
            code: "MISSING_FIELDS",
        });
    }

    next();
};
