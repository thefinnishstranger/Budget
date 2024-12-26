import axios from "axios";
const expenseUrl = "http://localhost:5001/api/expenses";

// Fetch all expenses
export const fetchExpenses = async () => {
    const request = await axios.get(expenseUrl);
    return request.then((response) => response.data);
};

// Create a new expense
export const createExpense = async (newExpense) => {
    const response = await axios.post(expenseUrl, newExpense); // Fixed variable name
    return response.data;
};

export const fecthParticularExpense = async (id) => {
    const response = await axios.get(`${expenseUrl}/${id}`);
    return request.then((response) => response.data);
}
