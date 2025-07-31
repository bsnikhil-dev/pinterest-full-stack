import express from "express";
import { registerUser, getUser, loginUser, logoutUser, followUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.get("/:username", getUser);
router.post("/follow/:username", followUser);

export default router;