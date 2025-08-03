import express from "express";
import { getPostComments, addComment, deleteAllComments } from "../controllers/comments.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateHeaders } from "../middlewares/validateHeaders.js"

const router = express.Router();

const authPipeline = [validateHeaders(), verifyToken];

router.use(authPipeline);

router.post("/addComment", addComment);
router.get("/deleteComments", deleteAllComments);
router.get("/:postId", getPostComments);

export default router;