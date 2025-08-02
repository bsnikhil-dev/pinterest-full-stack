import express from "express";
import { registerUser, getUser, loginUser, logoutUser, followUser } from "../controllers/users.controller.js";
import { validateHeaders } from "../middlewares/validateHeaders.js";
import { validateRegisterBody } from "../middlewares/validateRegisterBody.js";
import { validateLoginBody } from "../middlewares/validateLoginBody.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/auth/register", validateHeaders('register'), validateRegisterBody, registerUser);
router.post("/auth/login", validateHeaders('login'), validateLoginBody, loginUser);

const authPipeline = [validateHeaders()];

router.use(authPipeline);

router.post("/auth/logout", logoutUser);
router.get("/:username", getUser);
router.post("/follow/:username", followUser);

export default router;