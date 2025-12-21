import { initVectorCollection } from "../repositories/vector.repository.js";
import { mockNews } from "../utils/mockNews.js";
import { generatingEmbedding } from "./embedding.service.js";

export const ingestNewsServices = async () => {
  //fetch news (mock for now)
  const articles = mockNews();

  // validate data
  if (!articles || articles.length === 0) {
    throw new Error("No articles found for ingestion");
  }

  //simulate processing
  await initVectorCollection();

  for (const article of articles) {
    const embedding = await generatingEmbedding(article.content);
    processedArticles.push({
      ...articles,
      embedding,
    });
  }

  return {
    totalArticles: processedArticles.length,
  };
};
