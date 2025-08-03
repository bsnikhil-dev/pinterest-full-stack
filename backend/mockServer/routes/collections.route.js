import express from "express";
import { getUserCollections } from "../controllers/collections.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateHeaders } from "../middlewares/validateHeaders.js"

const router = express.Router();

const authPipeline = [validateHeaders(),verifyToken];

router.use(authPipeline);

router.get("/:userId", getUserCollections);

export default router;