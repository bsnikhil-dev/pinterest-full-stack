import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

export const registerUser = async (req, res) => {
    try {
        const { username, displayName, email, password } = req.body;

        const newHashedPassword = await bcrypt.hash(password, 10);

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

        const token = generateToken(user._id);

        const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const userDetails = {
            token: `Bearer ${token}`,
            userId: _id.toString(),
            ...rest,
        };
        return res.status(201).json(userDetails);
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }
};

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(user.img);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password", code: "INVALID_CREDENTIALS" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password", code: "INVALID_CREDENTIALS" });
        }

        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        const userDetails = {
            token: `Bearer ${token}`,
            userId: _id.toString(),
            ...rest,
        };
        return res.status(200).json(userDetails);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }
};

export const issueRefreshedToken = async (req, res) => {

    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: 'No refresh token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const accessToken = generateToken(decoded.userId);

        return res.json({ accessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }
}

export const logoutUser = async (req, res) => {

    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }

};

export const getUser = async (req, res) => {

    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        const { hashedPassword, ...otherDetails } = user.toObject();

        const followerCount = await Follow.countDocuments({ following: user._id });
        const followingCount = await Follow.countDocuments({ follower: user._id });

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return res.status(200).json({
            ...otherDetails,
            followerCount,
            followingCount,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", code: "INTERNAL_ERROR" });
    }


};

export const followUser = async (req, res) => {

    // const { username } = req.params;
    // const currentUserId = req.userId;

    // try {

    //     const user = await User.findOne({ username });

    //     const isFollowing = await Follow.exists({
    //         follower: req.userId,
    //         following: user._id,
    //     });

    //     if (isFollowing) {
    //         await Follow.deleteOne({ follower: req.userId, following: user._id });
    //         return res.status(200).json({ message: `Unfollowed ${username}.` });
    //     } else {
    //         await Follow.create({ follower: req.userId, following: user._id });
    //         return res.status(200).json({ message: `Started following ${username}.` });
    //     }

    // } catch (error) {
    //     console.error('Follow/unfollow error:', error);
    //     return res.status(500).json({ message: 'An error occurred.', error: error.message });
    // }
    const { username } = req.params;
    const currentUserId = req.userId;

    try {

        const userToFollow = await User.findOne({ username });
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (userToFollow._id.equals(currentUserId)) {
            return res.status(400).json({ message: "You can't follow yourself." });
        }

        // Check if already following
        const existingFollow = await Follow.findOne({
            follower: currentUserId,
            following: userToFollow._id,
        });

        if (existingFollow) {
            await existingFollow.deleteOne();
            return res.status(200).json({ message: `Unfollowed ${username}.` });
        } else {
            await Follow.create({ follower: currentUserId, following: userToFollow._id });
            return res.status(200).json({ message: `Started following ${username}.` });
        }

    } catch (error) {
        console.error('Follow/unfollow error:', error);
        return res.status(500).json({ message: 'An error occurred.', error: error.message });
    }

};