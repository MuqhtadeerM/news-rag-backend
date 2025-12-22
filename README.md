# News Intelligence RAG Backend API

A production-ready Node.js backend implementing a Retrieval-Augmented Generation (RAG) pipeline for answering user queries over a news corpus. The system combines semantic search, LLM-based generation, Redis chat memory, and PostgreSQL logging — built with clean backend architecture principles.

[Live demo / Postman collection]: (add link)

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Environment Variables](#environment-variables)
  - [Run with Docker (recommended)](#run-with-docker-recommended)
  - [Run Locally (without Docker)](#run-locally-without-docker)
- [API Endpoints](#api-endpoints)
  - [POST /ingest](#post-ingest)
  - [POST /chat](#post-chat)
  - [GET /history/:sessionId](#get-historysessionid)
  - [DELETE /history/:sessionId](#delete-historysessionid)
- [RAG Workflow](#rag-workflow)
- [Persistence & Caching](#persistence--caching)
- [Testing](#testing)
- [Logging & Analytics](#logging--analytics)
- [Troubleshooting & Notes](#troubleshooting--notes)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- Full RAG pipeline:
  - News ingestion with embeddings
  - Semantic search using a vector DB (Qdrant)
  - Context-aware LLM responses (Gemini mocked for local)
- REST APIs:
  - Ingest news, chat with system, fetch and clear session history
- Persistence & caching:
  - Qdrant for vector search
  - Redis for short-term chat memory
  - PostgreSQL (via Sequelize) for structured logs
- Clean architecture (Routes → Controllers → Services → Repositories)
- Centralized error handling and input validation
- Dockerized for easy deployment

## Architecture Overview

Client (Postman / Frontend)
        |
        v
     Express API
        |
        +--> Redis (Chat Memory)
        |
        +--> Qdrant (Vector DB / Semantic Search)
        |
        +--> PostgreSQL (Logs via Sequelize)
        |
        +--> LLM (Google Gemini — mocked for local development)

## Tech Stack

- Runtime: Node.js (ES Modules)
- Framework: Express.js
- Vector DB: Qdrant
- Cache: Redis
- Database: PostgreSQL
- ORM: Sequelize
- LLM: Google Gemini (mock for local testing)
- DevOps: Docker & Docker Compose

## Project Structure

```
src/
├── app.js
├── server.js
│
├── config/
│   ├── db.js
│   ├── redis.js
│   ├── vectorDb.js
│
├── routes/
├── controllers/
├── services/
├── repositories/
├── models/
├── middlewares/
├── utils/
│
└── docker/
```

This layout enforces separation of concerns for scalability and testability.

## Getting Started

### Requirements

- Node.js (v18+ recommended)
- Redis
- PostgreSQL
- Qdrant (vector DB)
- Docker & Docker Compose (recommended for starting all services)

### Environment Variables

Create a `.env` file (example):

```
PORT=3000
NODE_ENV=development

# PostgreSQL
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=news_rag

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Qdrant
QDRANT_HOST=qdrant
QDRANT_PORT=6333
QDRANT_API_KEY=your_qdrant_api_key_if_any

# LLM (if using external provider)
LLM_PROVIDER=mock
LLM_API_KEY=

# Other
SESSION_TTL=3600
TOP_K=5
```

Adjust hostnames/ports when running services locally vs Docker.

### Run with Docker (recommended)

The repository includes Docker Compose to run the API plus dependencies.

1. Build and start services:
```bash
docker-compose up --build
```

2. The API will be available at `http://localhost:3000` (or the port in your `.env`).

Docker Note:
- On certain Windows networks (ISP / Cloudflare / IPv6 routing issues), Docker image pulls may fail due to HTTPS timeouts. If you hit these issues:
  - Ensure images are cached,
  - Use an alternate network,
  - Or run services locally without Docker.

### Run Locally (without Docker)

If you prefer to run services locally:

1. Start dependencies:
```bash
# Start Redis, PostgreSQL, Qdrant (platform-specific)
redis-server
# start postgres (e.g., via system service or Docker)
# start qdrant
```

2. Install dependencies and start API:
```bash
npm install
node src/server.js
```

## API Endpoints

All endpoints return JSON. Example success wrapper:
```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

### POST /ingest
Ingest news articles into the vector DB and persist metadata.

Request body (example):
```json
{
  "articles": [
    {
      "id": "article-1",
      "title": "AI in healthcare",
      "content": "AI is transforming diagnostics...",
      "publishedAt": "2025-01-10T12:45:00Z",
      "source": "Example News"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "message": "News ingested successfully",
  "data": {
    "totalArticles": 1
  }
}
```

### POST /chat
Chat with the RAG system. Uses session memory and logs each interaction.

Request body:
```json
{
  "sessionId": "session-1",
  "query": "How is AI used in healthcare?"
}
```

Response:
```json
{
  "success": true,
  "answer": "AI is being widely adopted in healthcare diagnostics..."
}
```

### GET /history/:sessionId
Fetch chat history for a session (from Redis / logs).

Response: returns messages and metadata for the session.

### DELETE /history/:sessionId
Clear chat memory for the session and optionally purge logs.

Response: success/failure info.

## RAG Workflow

1. Convert the user query to an embedding.
2. Retrieve top-K relevant news documents from Qdrant.
3. Inject retrieved context into a prompt template.
4. Call the LLM (Gemini or mock) to generate a contextual response.
5. Cache chat context in Redis (short-term).
6. Log the interaction (sessionId, query, response, response time, timestamp) in PostgreSQL.

## Persistence & Caching

- Qdrant: stores embeddings and enables fast semantic retrieval.
- Redis: short-term session memory (chat context).
- PostgreSQL (via Sequelize): structured logs for auditing and analytics.

## Testing

- APIs can be tested with Postman or curl.
- Verify vector search via Qdrant dashboard.
- Confirm logs in PostgreSQL (interactions table).
- Unit and integration tests can be added following the service and controller separation.

## Logging & Analytics

Each `/chat` interaction logs:
- Session ID
- User query
- LLM response
- Response time
- Timestamp

This enables analytics, auditing, and performance monitoring.

## Troubleshooting & Notes

- Docker image pull timeouts on some Windows networks are a known Docker Desktop limitation. If you encounter HTTPS timeouts:
  - Re-run once images are cached or use another network.
  - Alternatively, run dependencies locally and start the API without Docker.
- Qdrant: ensure the collection schema and vector size match your embedding provider.
- LLM: Gemini is mocked for local dev; replace with a real LLM provider and key for production.

## Contributing

Contributions are welcome. Suggested workflow:
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/some-feature`
3. Commit changes and push
4. Open a PR with a clear description and tests (if applicable)

Follow code style, add tests for new features, and keep commits focused.

## License

Specify license here (e.g., MIT). Add a `LICENSE` file to the repository.

## Author

Muhammed Muqhtadeer  
Backend Developer (Node.js, Express, Redis, RAG, Docker, Databases)

Contact / GitHub: [MuqhtadeerM](https://github.com/MuqhtadeerM)
