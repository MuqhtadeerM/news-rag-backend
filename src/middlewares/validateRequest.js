import { AppError } from "../utils/AppError.js";

export const validateChatRequest = (req, res, next) => {
  const { sessionId, query } = req.body;

  if (!sessionId || !query) {
    return next(new AppError("sessionId and query are required", 400));
  }

  next();
};
