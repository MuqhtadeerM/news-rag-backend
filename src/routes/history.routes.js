import express from "express";
import {
  getSessionHistory,
  clearSessionHistory,
} from "../controllers/history.controller.js";

const router = express.Router();

/**
 * GET /history/:sessionId
 */
router.get("/:sessionId", getSessionHistory);

/**
 * DELETE /history/:sessionId
 */
router.delete("/:sessionId", clearSessionHistory);

export default router;
