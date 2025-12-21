import express from "express";
import { chatWithRAG } from "../controllers/chat.controller.js";

const router = express.Router();

// post request for for chat
router.post("/", chatWithRAG);

export default router;
