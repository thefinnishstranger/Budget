import express from "express";
import Expense from "../schemas/ExpenseSchema.js"

const expenseRouter = express.Router();

expenseRouter.get("/", async (request, response) => {
    const expenses = await Expense.find({})
    response.json(expenses.map((expense) => expense.toJSON()));
})

expenseRouter.post("/", async (request, response) => {
    const body = request.body;
    const expense = new Expense({
        cost: body.cost,
        category: body.category,
        date: body.date
    })

    const savedExpense = await expense.save();
    response.status(201).json(savedExpense);
})

expenseRouter.get("/monthly", async (req, res) => {
    const { year, month } = req.query;
  
    if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required." });
    }
  
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month
  
    try {
      const expenses = await Expense.aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: { $dayOfMonth: "$date" },
            total: { $sum: "$cost" },
          },
        },
        {
          $project: {
            day: "$_id",
            total: 1,
            _id: 0,
          },
        },
        {
          $sort: { day: 1 },
        },
      ]);
  
      console.log("Expenses fetched:", expenses); // Debugging
      res.json(expenses);
    } catch (error) {
      console.error("Error fetching monthly spending:", error);
      res.status(500).json({ error: "Failed to fetch monthly spending" });
    }
  });
  
export default expenseRouter;