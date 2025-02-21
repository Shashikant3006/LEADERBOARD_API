import express from "express";
import { connectDb } from "./config/dbConnection.js";
import cors from "cors";
// *********** All-Routes *************
import auth from "./routes/auth.routes.js";
import user from "./routes/user.routes.js";
// *********** All-Routes *************

import cookieParser from "cookie-parser";
const app = express();

// Use cors middleware
app.use(
  cors({
    origin: [
      "https://leaderboard-client-o300kahg4-shashikants-projects-f4bc43cb.vercel.app", // Deployed React app
      "http://localhost:3000", // Local React app for testing
    ],
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed methods
    credentials: true, // Allow cookies (if needed)
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *********** All-Routes *************

app.get("/", (req, res) => {
  res.json("I'm coming from backend");
});
app.use("/api/auth/v1", auth);
app.use("/api/user/v1", user);

// Handle wrong APIs
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Please check the URL and try again.",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error.",
    error: err.message,
  });
});

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDb();
});
