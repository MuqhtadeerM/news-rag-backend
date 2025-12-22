import {
  getChatHistory,
  clearChatHistory,
} from "../repositories/chatMemory.repository.js";
import { ChatLog } from "../models/chatLog.model.js";

export const fetchSessionHistory = async (sessionId) => {
  // 1️⃣ Fetch Redis chat memory
  const redisHistory = await getChatHistory(sessionId);

  // 2️⃣ Fetch SQL logs
  const dbHistory = await ChatLog.findAll({
    where: { sessionId },
    order: [["createdAt", "ASC"]],
  });

  return {
    redisMemory: redisHistory,
    sqlLogs: dbHistory,
  };
};

export const deleteSessionHistory = async (sessionId) => {
  // Clear Redis memory
  await clearChatHistory(sessionId);

  // Optional: keep SQL logs for analytics (recommended)
  // If needed, uncomment below:
  // await ChatLog.destroy({ where: { sessionId } });
};
