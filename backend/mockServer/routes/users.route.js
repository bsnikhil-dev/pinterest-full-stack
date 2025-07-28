import express from "express";
import { registerUser,getUser } from "../controllers/users.controller.js";

const router = express.Router();

router.post("/auth/register", registerUser);
router.get("/:username", getUser);
export default router;