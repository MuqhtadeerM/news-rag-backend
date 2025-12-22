import { ingestNewsService } from "../services/ingest.service";

export const ingestNews = async (req, res, next) => {
  try {
    // fetching the data
    const result = await ingestNewsService();

    res.status(200).json({
      success: true,
      message: "News ingested successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
