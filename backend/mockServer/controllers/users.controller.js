import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
    try {
        const { username, displayName, email, password } = req.body;

        const newHashedPassword = await bcrypt.hash(password, 10);

        // Check for existing user with same email or username
        const existingUser = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            const conflictField = existingUser.email === email.toLowerCase() ? 'email' : 'username';
            return res.status(409).json({
                message: `User with this ${conflictField} already exists.`,
                code: 'USER_ALREADY_EXISTS'
            });
        }

        const user = await User.create({
            username,
            displayName,
            email,
            hashedPassword: newHashedPassword,
        });

        const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

        const userDetails = {
            userId: _id.toString(),
            ...rest,
        };
        res.status(201).json(userDetails);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }

};

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", code: "INVALID_CREDENTIALS" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password", code: "INVALID_CREDENTIALS" });
        }

        const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

        const userDetails = {
            userId: _id.toString(),
            ...rest,
        };
        res.status(200).json(userDetails);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }


};

export const logoutUser = async (req, res) => {

};

export const getUser = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const { hashedPassword, ...otherDetails } = user.toObject();

    const followerCount = await Follow.countDocuments({ following: user._id });
    const followingCount = await Follow.countDocuments({ follower: user._id });

    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(200).json({
        ...otherDetails,
        followerCount,
        followingCount,
    });

};

export const followUser = async (req, res) => {

};