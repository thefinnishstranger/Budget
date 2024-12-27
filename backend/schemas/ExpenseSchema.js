import mongoose from "mongoose";
const { Schema } = mongoose;

var expenseSchema = new Schema({
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true, // Ensure that each expense is tied to a user
  },
});

const Expense = mongoose.model("Expense", expenseSchema, "Expenses");

export default Expense;
