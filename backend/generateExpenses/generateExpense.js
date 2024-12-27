import mongoose from "mongoose";
import Expense from "../schemas/ExpenseSchema.js";

// MongoDB connection
mongoose.connect(
  "mongodb+srv://nikolas:Nikolas01@nikolasgustavson.uewwjz3.mongodb.net/Budget?retryWrites=true&w=majority&appName=nikolasgustavson",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const categories = [
  "Savings",
  "Food",
  "Utilities",
  "Housing",
  "Transportation",
  "Insurance",
  "Household",
  "Debt",
  "Retirement",
  "Personal",
  "Other",
];

// Helper function to generate a random date
const getRandomDate = () => {
  const start = new Date(2020, 0, 1); // Jan 1, 2020
  const end = new Date(); // Today
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Function to generate expenses
const generateExpenses = (count) => {
  const expenses = [];
  for (let i = 0; i < count; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomCost = parseFloat((Math.random() * 1000).toFixed(2)); // Random cost up to $1000
    const randomDate = getRandomDate();

    expenses.push({
      cost: randomCost,
      category: randomCategory,
      date: randomDate,
      userId: "676c4934394dae9f473a03a9"
    });
  }
  return expenses;
};

// Function to insert expenses into the database
const insertExpenses = async (count) => {
  try {
    const expenses = generateExpenses(count);
    await Expense.insertMany(expenses);
    console.log(`${count} expenses inserted successfully.`);
  } catch (error) {
    console.error("Error inserting expenses:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Insert 1000 expenses
insertExpenses(1000);
