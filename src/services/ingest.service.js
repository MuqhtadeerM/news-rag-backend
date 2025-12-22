import { mockNews } from "../utils/mockNews.js";
import {
  initVectorCollection,
  upsertArticleVector,
} from "../repositories/vector.repository.js";
import { generatingEmbedding } from "./embedding.service.js";

export const ingestNewsService = async () => {
  const articles = mockNews();

  if (!articles || articles.length === 0) {
    throw new AppError("No articles found for ingestion", 400);
  }

  await initVectorCollection();

  const processedArticles = [];

  for (const article of articles) {
    const embedding = await generatingEmbedding(article.content);

    const processed = {
      ...article,
      embedding,
    };

    await upsertArticleVector(processed);
    processedArticles.push(processed);
  }

  return {
    totalArticles: processedArticles.length,
  };
};
