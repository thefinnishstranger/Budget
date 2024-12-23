import express from "express";
import Expense from "../schemas/ExpenseSchema.js"

const expenseRouter = express.Router();

expenseRouter.get("/", async (request, response) => {
    const expenses = await Expense.find({})
    response.json(expenses.map((expense) => expense.toJSON()));
})

export default expenseRouter;