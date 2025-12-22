// this service is responsible for generatinng the embedding later we can use to replace with the OpenAI

export const generatingEmbedding = async (text) => {
  if (!text) {
    throw new Error("Text is required for embedding");
  }

  // simulate vector
  // in real life it comes from the ml model

  const vector = Array.from({ length: 10 }, () =>
    Number(Math.random().toFixed(4))
  );

  return vector;
};
