import {
  getChatHistory,
  saveChatHistory,
} from "../repositories/chatMemory.repository.js";
import {
  initVectorCollection,
  searchSimilarArticles,
} from "../repositories/vector.repository.js";
import { generatingEmbedding } from "./embedding.service.js";
import { generateLLMResponse } from "./llm.service.js";

export const chatServices = async (sessionId, query) => {
  // ensures the saftey check whetheer the collections exists or not
  await initVectorCollection();

  // laod previous chat conversations
  const history = await getChatHistory(sessionId);

  // generate embeddding for user quuerry
  const queryEmbedding = await generatingEmbedding(query);

  // search vector db
  const searchResults = await searchSimilarArticles(queryEmbedding, 3);

  //build contet from retrived documets

  const context = searchResults
    .map((result, index) => {
      `Source ${index + 1}: ${result.payload.content}`;
    })
    .join("\n\n");

  const prompt = `you are a helpful news assistant Use the following news context to answer the questions
    
    Context: ${context}

    Question: 
    ${query}
    `;

  // generate answer using llm
  const answer = await generateLLMResponse(prompt);

  // save updated conversation
  const updatedHistory = [
    ...history,
    { role: "user", content: query },
    { role: "assistant", content: answer },
  ];

  await saveChatHistory(sessionId, updatedHistory);

  return answer;
};
