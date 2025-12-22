export const chatService = async (sessionId, query) => {
  const startTime = Date.now(); // ✅ MUST exist

  await initVectorCollection();

  const history = await getChatHistory(sessionId);

  const queryEmbedding = await generateEmbedding(query);
  const searchResults = await searchSimilarArticles(queryEmbedding, 3);

  const context = searchResults
    .map((r, i) => `Source ${i + 1}: ${r.payload.content}`)
    .join("\n\n");

  const conversation = history
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = `
Conversation:
${conversation}

Context:
${context}

Question:
${query}
`;

  const answer = await generateLLMResponse(prompt);

  // ✅ DEFINE responseTimeMs HERE
  const responseTimeMs = Date.now() - startTime;

  await saveChatHistory(sessionId, [
    ...history,
    { role: "user", content: query },
    { role: "assistant", content: answer },
  ]);

  // ✅ USE SAME VARIABLE NAME
  await saveChatLog({
    sessionId,
    userQuery: query,
    llmResponse: answer,
    responseTimeMs,
  });

  return answer;
};
