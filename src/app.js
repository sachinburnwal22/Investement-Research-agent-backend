require("dotenv").config();
const express = require("express");
const cors = require("cors");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

// Allow the Vercel frontend + localhost for local dev
const allowedOrigins = [
  "https://investement-research-agent-frontend.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

// Also support a custom CORS_ORIGIN env var for flexibility
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Render health pings, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/analyze", analyzeRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Investment Research Agent API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
