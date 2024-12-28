import axios from "axios";

const expenseUrl = "http://localhost:5001/api/expenses";

const getMonthlySpending = async (userId, year, month) => {
    try {
      const response = await axios.get(`${expenseUrl}/${userId}/monthly`, {
        params: { year, month },
      });
      return response.data; // Return the expenses
    } catch (error) {
      console.error("Error fetching monthly spending:", error);
      throw error;
    }
  };

const getYearlySpending = async (userId, year) => {
    try {
        const response = await axios.get(`${expenseUrl}/${userId}/yearly`, {
            params: {year}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching yearly spending:", error);
        throw error;
        
    }
}

const getAllExpenses = async () => {
  try {
    const response = await axios.get(expenseUrl);
    return response.data; // Axios directly provides the response data
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

const addExpense = async (expense) => {
  try {
    const response = await axios.post(expenseUrl, expense); // Axios handles JSON stringifying internally
    return response.data; // Return the added expense data
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

const getMonthlyDetails = async (userId, year, month) => {
    try {
      const response = await axios.get(`${expenseUrl}/${userId}/monthly-details`, {
        params: { year, month },
      });
      return response.data; // Return the detailed expenses
    } catch (error) {
      console.error("Error fetching monthly details:", error);
      throw error;
    }
  };

// Export all functions as a single object
export default {
  getMonthlySpending,
  getAllExpenses,
  addExpense,
  getYearlySpending,
  getMonthlyDetails
};
