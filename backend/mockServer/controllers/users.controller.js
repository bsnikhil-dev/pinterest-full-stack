import User from "../models/user.model.js";
import Follow from "../models/follow.model.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
    const { username, displayName, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const newHashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        displayName,
        email,
        hashedPassword: newHashedPassword,
    });

    const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

    const userDetails = {
        userId: _id.toString(),
        ...rest
    };
    res.status(201).json(userDetails);

};

export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const { _id, hashedPassword, createdAt, updatedAt, __v, ...rest } = user.toObject();

    const userDetails = {
        userId: _id.toString(),
        ...rest
    };

    res.status(200).json(userDetails);


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