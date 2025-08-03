import express from "express";
import { registerUser, getUser, loginUser, logoutUser, followUser, issueRefreshedToken } from "../controllers/users.controller.js";
import { validateHeaders } from "../middlewares/validateHeaders.js";
import { validateRegisterBody } from "../middlewares/validateRegisterBody.js";
import { validateLoginBody } from "../middlewares/validateLoginBody.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/auth/register", validateHeaders('register'), validateRegisterBody, registerUser);
router.post("/auth/login", validateHeaders('login'), validateLoginBody, loginUser);
router.post("/auth/refresh", validateHeaders(), issueRefreshedToken);
router.post("/auth/logout", validateHeaders(), logoutUser);

const authPipeline = [validateHeaders(), verifyToken];

router.use(authPipeline);

router.get("/:username", getUser);
router.post("/follow/:username", followUser);

export default router;