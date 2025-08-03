import express from "express";
import { getPins, getPin } from "../controllers/pin.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateHeaders } from "../middlewares/validateHeaders.js"

const router = express.Router();

const authPipeline = [validateHeaders(),verifyToken];

router.use(authPipeline);

router.get("/", getPins);
router.get("/:id", getPin);

export default router;
