const getMonthlySpending = async (year, month) => {
    try {
      const response = await fetch(`/api/expenses/monthly?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }
  
      return data;
    } catch (error) {
      console.error("Error fetching monthly spending:", error);
      throw error;
    }
  };
  
  
  const getAllExpenses = async () => {
    try {
      const response = await fetch("/api/expenses");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  };
  
  const addExpense = async (expense) => {
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding expense:", error);
      throw error;
    }
  };
  
  // Export all functions as a single object
  export default {
    getMonthlySpending,
    getAllExpenses,
    addExpense,
  };
  