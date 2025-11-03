import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import HobbyRouter from "./Controller/HobbyController.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Hobby routes
app.use("/hobbies", HobbyRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB Error:", err.message));
