import { chatServices } from "../services/chat.service.js";

export const chatWithRAG = async (req, res, next) => {
  try {
    const { sessionId, query } = req.body;

    if (!sessionId || !query) {
      return res.status(400).json({
        success: false,
        message: "sessionId and query are required",
      });
    }

    const response = await chatServices(sessionId, query);

    res.status(200).json({
      success: true,
      answer: response,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
