export const validateLoginBody = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Missing required fields: email or password.",
            code: "MISSING_FIELDS",
        });
    }

    next();
};
