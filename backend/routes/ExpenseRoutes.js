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

export default expenseRouter;