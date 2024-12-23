import mongoose from "mongoose";
const { Schema } = mongoose;

var expenseSchema = new Schema({
    cost: {
        type: Number
    },
    category: {
        type: String
    },
    date: {
        type: Date
    }

})

const Expense = mongoose.model("Expense", expenseSchema, "Expenses");

export default Expense;