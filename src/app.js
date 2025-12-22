import express from "express";
import cors from "cors";
import ingestRoutes from "./routes/ingest.routes.js";
import historyRoutes from "./routes/history.routes.js";
import chatRouter from "./routes/chat.routes.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
// creating the app using express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/ingest", ingestRoutes);
app.use("/chat", chatRouter);
app.use("./history", historyRoutes);
app.use(globalErrorHandler);

// Health Check
app.get("/", (req, res) => {
  res.send("News RAG API is Running...");
});

export default app;
