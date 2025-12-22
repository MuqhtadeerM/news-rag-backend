import { ChatLog } from "../models/chatLog.model";

export const saveChatLog = async ({
  sessionId,
  userQuery,
  llmResponse,
  responseTimeMS,
}) => {
  await ChatLog.create({
    sessionId,
    userQuery,
    llmResponse,
    responseTimeMS,
  });
};
