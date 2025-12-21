import {
  initVectorCollection,
  searchSimilarArticles,
} from "../repositories/vector.repository.js";
import { generatingEmbedding } from "./embedding.service.js";
import { generateLLMResponse } from "./llm.service.js";

export const chatServices = async (sessionId, query) => {
  // ensures the saftey check whetheer the collections exists or not
  await initVectorCollection();

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
  return answer;
};
