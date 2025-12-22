import express from "express";
import { chatWithRAG } from "../controllers/chat.controller.js";
import { validateChatRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

// post request for for chat
router.post("/", validateChatRequest, chatWithRAG);

export default router;
