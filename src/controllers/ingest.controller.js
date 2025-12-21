import { ingestNewsServices } from "../services/ingest.service.js";

export const ingestNews = async (req, res, next) => {
  try {

    // fetching the data
    const result = await ingestNewsServices();

    res.status(200).json({
      success: true,
      message: "News ingested successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
