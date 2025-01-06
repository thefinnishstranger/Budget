import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import accountRouter from "./routes/AccountRoutes.js";
import expenseRouter from "./routes/ExpenseRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error))

    app.use(cors({
        origin: 'https://frontend-young-snow-8341.fly.dev', // Frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        credentials: true, // If sending cookies or credentials
      }));

app.use("/api", accountRouter);
app.use("/api/expenses", expenseRouter);

export default app;