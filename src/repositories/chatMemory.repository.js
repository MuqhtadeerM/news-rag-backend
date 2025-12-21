import { redis } from "../config/redis.js";

const SESSION_TTL = 60 * 30;

export const getChatHistory = async (sessionId) => {
  const history = await redis.get(sessionId);
  return history ? JSON.parse(history) : [];
};

export const saveChatHistory = async (sessionId, messages) => {
  await redis.set(sessionId, JSON.stringify(messages), "EX", SESSION_TTL);
};

export const clearChatHistory = async (sessionId) => {
  await redis.del(sessionId);
};
