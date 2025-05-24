import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

//  Set __dirname correctly
const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "config.env") });

//  Debugging: Ensure env variables are loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI || "Not Defined");
console.log("PORT:", process.env.PORT || "5000");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL || "http://localhost:3000");

export const app = express();

// Fix: Improve CORS configuration
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//  Debugging: Log CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

//  Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes
app.use("/api/v1/user", userRouter);

//  Start account cleanup automation
removeUnverifiedAccounts();

//  Ensure database connection is properly handled
connection()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1); // Exit if DB fails to connect
  });

// Error middleware
app.use(errorMiddleware);
