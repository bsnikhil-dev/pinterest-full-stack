import express from "express";
import { getPostComments } from "../controllers/comments.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateHeaders } from "../middlewares/validateHeaders.js"

const router = express.Router();

const authPipeline = [validateHeaders(),verifyToken];

router.use(authPipeline);

router.get("/:postId", getPostComments);

export default router;