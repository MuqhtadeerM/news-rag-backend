import { vectorDB } from "../config/vectorDb.js";

const COLLECTION_NAME = "news_articles";

/**
 * Initialize collection (run once)
 */
export const initVectorCollection = async () => {
  const collections = await vectorDB.getCollections();

  const exists = collections.collections.find(
    (c) => c.name === COLLECTION_NAME
  );

  if (!exists) {
    await vectorDB.createCollection(COLLECTION_NAME, {
      vectors: {
        size: 10,
        distance: "Cosine",
      },
    });
  }
};

/**
 * Store vector
 */
export const upsertArticleVector = async (article) => {
  await vectorDB.upsert(COLLECTION_NAME, {
    points: [
      {
        id: article.id,
        vector: article.embedding,
        payload: {
          title: article.title,
          content: article.content,
        },
      },
    ],
  });
};

/**
 * Search vectors
 */
export const searchSimilarArticles = async (queryVector, limit = 3) => {
  const result = await vectorDB.search(COLLECTION_NAME, {
    vector: queryVector,
    limit,
  });

  return result;
};
