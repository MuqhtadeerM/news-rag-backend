import express from "express";
import cors from "cors";

// creating the app using express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.send("News RAG API is Running...");
});

export default app;
