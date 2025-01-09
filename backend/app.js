import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import accountRouter from "./routes/AccountRoutes.js";
import expenseRouter from "./routes/ExpenseRoutes.js";
import middleware from "./utils/middleware.js";

dotenv.config();

const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error))

app.use(cors());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api", accountRouter);
app.use("/api/expenses", expenseRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;