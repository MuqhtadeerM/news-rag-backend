import express from "express";
import { ingestNews } from "../controllers/ingest.controller.js";

const router = express.Router();

// POST triggers the new pipline
router.post("/", ingestNews);

export default router;
