import express from "express";
import { getUserCollections } from "../controllers/collections.controller.js";

const router = express.Router();

router.get("/:userId", getUserCollections);

export default router;