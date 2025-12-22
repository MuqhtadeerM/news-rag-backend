import {
  fetchSessionHistory,
  deleteSessionHistory,
} from "../services/history.service.js";

export const getSessionHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    const history = await fetchSessionHistory(sessionId);

    res.status(200).json({
      success: true,
      sessionId,
      history,
    });
  } catch (error) {
    next(error);
  }
};

export const clearSessionHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    await deleteSessionHistory(sessionId);

    res.status(200).json({
      success: true,
      message: "Session history cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};
