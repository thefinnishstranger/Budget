import express from "express";
import Expense from "../schemas/ExpenseSchema.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const expenseRouter = express.Router();

expenseRouter.get("/", async (request, response) => {
    const expenses = await Expense.find({})
    response.json(expenses.map((expense) => expense.toJSON()));
})

expenseRouter.post("/", async (request, response) => {
    const { cost, category, date, userId } = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (decodedToken) {
      return console.log("success");
    }
    

    if (!decodedToken) {
      return response.json(401).json({ error: "token invalid" });
    }

    if (!userId) {
      return response.status(400).json({ error: "User ID is required." });
    }

    if (!cost || !category || !date) {
      return response.status(400).json({ error: "Cost, category, and date are required." });
      }
      
    const expense = new Expense({
        cost,
        category,
        date,
        userId
    })

    try {
        const savedExpense = await expense.save();
        response.status(201).json(savedExpense);
      } catch (error) {
        console.error("Error saving expense:", error);
        response.status(500).json({ error: "Failed to save expense" });
      }
})

expenseRouter.get("/:userId/monthly", async (req, res) => {
    const { userId } = req.params;
    const { year, month } = req.query;
  
    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required." });
    }
  
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month
  
    console.log("Received Params:", { userId, year, month });
    console.log("Date Range:", { startDate, endDate });
  
    try {
      const expenses = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId), // Fixed ObjectId instantiation
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { $dayOfMonth: "$date" }, // Group by day of the month
            total: { $sum: "$cost" },     // Sum the costs for each day
          },
        },
        {
          $project: {
            day: "$_id",                  // Rename _id to day
            total: 1,                     // Include total in the output
            _id: 0,                       // Exclude the default _id field
          },
        },
        {
          $sort: { day: 1 },              // Sort by day of the month
        },
      ]);
  
      console.log("Aggregated Expenses:", expenses);
      res.json(expenses);
    } catch (error) {
      console.error("Error fetching monthly spending:", error);
      res.status(500).json({ error: "Failed to fetch monthly spending." });
    }
  });
  
  
  expenseRouter.get("/:userId/yearly", async (req, res) => {
    const { userId } = req.params;
    const { year } = req.query;
  
    if (!year) {
      return res.status(400).json({ error: "Year is required." });
    }
  
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // December 31st, 23:59:59
  
    console.log("Yearly Params:", { userId, year });
    console.log("Date Range:", { startDate, endDate });
  
    try {
      const expenses = await Expense.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { $month: "$date" }, // Group by month
            total: { $sum: "$cost" }, // Sum the costs for each month
          },
        },
        {
          $project: {
            month: "$_id", // Rename _id to month
            total: 1,      // Include total in the output
            _id: 0,        // Exclude the default _id field
          },
        },
        {
          $sort: { month: 1 }, // Sort by month
        },
      ]);
  
      console.log("Yearly Aggregated Expenses:", expenses);
      res.json(expenses); // Send response
    } catch (error) {
      console.error("Error fetching yearly spending:", error);
      res.status(500).json({ error: "Failed to fetch yearly spending." });
    }
  });
  


  expenseRouter.get("/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      const expenses = await Expense.find({ userId }).exec();
      res.json(expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ error: "Failed to fetch expenses" });
    }
  });

  expenseRouter.get("/:userId/monthly-details", async (req, res) => {
    const { userId } = req.params;
    const { year, month } = req.query;
  
    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required." });
    }
  
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // End of the month, inclusive
  
    console.log("Monthly Detailed Params:", { userId, year, month });
    console.log("Date Range:", { startDate, endDate });
  
    try {
      // Find expenses matching the userId and date range
      const expenses = await Expense.find({
        userId: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate, $lte: endDate },
      }).exec();
  
      console.log("Detailed Monthly Expenses:", expenses);
      res.json(expenses); // Send back the raw expense details
    } catch (error) {
      console.error("Error fetching detailed monthly expenses:", error);
      res.status(500).json({ error: "Failed to fetch monthly detailed expenses." });
    }
  });
  
  
export default expenseRouter;