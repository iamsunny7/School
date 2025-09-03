import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import schoolRoutes from "./routes/schoolRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/schools", schoolRoutes);

// Connect DB & Start Server
connectDB();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
