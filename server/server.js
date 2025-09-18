import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import farmRoutes from "./src/routes/farmRoutes.js";
import flockRoutes from "./src/routes/flockRoutes.js";
import pigRoutes from "./src/routes/pigRoutes.js";
import cattleRoutes from "./src/routes/cattleRoutes.js";
import healthRoutes from "./src/routes/healthRoutes.js";
import alertRoutes from "./src/routes/alertRoutes.js";
import logRoutes from "./src/routes/logRoutes.js";

import { errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());



app.use("/api/users", authRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/flocks", flockRoutes);
app.use("/api/pigs", pigRoutes);
app.use("/api/cattle", cattleRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/logs", logRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
