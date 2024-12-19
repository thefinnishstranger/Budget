import React, { useState } from "react";

const ExpenseInput: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const categories = [
    "savings",
    "food",
    "utilities",
    "housing",
    "transportation",
    "insurance",
    "household",
    "debt",
    "retirement",
    "personal",
    "other",
  ];

  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add a New Expense</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Expense Submitted:", { selectedCategory });
            onClose(); // Close modal on submission
          }}
        >
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
            >
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseInput;
