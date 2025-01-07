import React, { useState } from "react";
import expenseService from "../services/expenseService";

const ExpenseInput: React.FC<{ onClose: () => void }> = ({ onClose }) => {
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

  const [selectedCategory, setSelectedCategory] = useState(categories[10]); // Default to "Other"
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getToken = () => {
    const user = localStorage.getItem("loggedUser");
    if (!user) return null;
    return JSON.parse(user).token;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const user = localStorage.getItem("loggedUser");
     // Example: Retrieve from local storage
    console.log(user, "here is userID");
    if (user) {
      const parsedUser = JSON.parse(user);
      const userId = parsedUser.userId;
      console.log("here is user id finally", userId);
         
    const category = selectedCategory;
    const expenseAmount = parseFloat(cost); // Convert cost to a number
    const newExpense = { category, cost: expenseAmount, date, userId }; // Include userId 
    const token = getToken();

    try {
      await expenseService.addExpense(newExpense, token);
      onClose(); // Close the modal after successful submission
    } catch (error: unknown) {
      console.error("Error creating expense", error);
    } finally {
      setIsSubmitting(false);
    }
    }
  
    
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add a New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="expense"
            >
              Expense Amount
            </label>
            <input
              id="expense"
              type="number"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter amount"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="date"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              className="border border-gray-300 rounded w-full p-2"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              className="border border-gray-300 rounded w-full p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose} // Close modal on cancel
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseInput;
