import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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