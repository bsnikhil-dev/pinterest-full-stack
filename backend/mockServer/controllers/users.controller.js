import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Follow from "../models/follow.model.js"

export const registerUser = async (req, res) => {
    const userInformation = req.body;
    console.log(userInformation);

    const { username, displayName, email, password } = req.body;
    const newHashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        displayName,
        email,
        hashedPassword: newHashedPassword,
    })

    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();

    res.status(201).json(detailsWithoutPassword);

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