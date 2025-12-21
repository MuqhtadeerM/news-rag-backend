import express from "express";
import cors from "cors";
import ingestRoutes from "./routes/ingest.routes.js";
import chatRouter from "./routes/chat.routes.js";
// creating the app using express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use("/ingest", ingestRoutes);
app.use("/chat", chatRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("News RAG API is Running...");
});

export default app;
