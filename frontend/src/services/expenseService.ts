import axios from "axios";

const expenseUrl = "https://backend-wispy-firefly-9646.fly.dev/api/expenses";

interface Expense {
  cost: number;
  category: string;
  date: string;
  userId: string | null;
}

interface MonthlySpending {
  day: number;
  total: number;
}

interface YearlySpending {
  month: number;
  total: number;
}

export interface MonthlyDetails {
  category: string;
  cost: number;
  date: string;
}


const getMonthlySpending = async (
  userId: string,
  year: number,
  month: number
): Promise<MonthlySpending[]> => {
  try {
    const response = await axios.get<MonthlySpending[]>(
      `${expenseUrl}/${userId}/monthly`,
      { params: { year, month } }
    );
    return response.data; // Return the expenses
  } catch (error) {
    console.error("Error fetching monthly spending:", error);
    throw error;
  }
};

const getYearlySpending = async (
  userId: string,
  year: number
): Promise<YearlySpending[]> => {
  try {
    const response = await axios.get<YearlySpending[]>(
      `${expenseUrl}/${userId}/yearly`,
      { params: { year } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching yearly spending:", error);
    throw error;
  }
};

const getAllExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await axios.get<Expense[]>(expenseUrl);
    return response.data; // Axios directly provides the response data
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

const addExpense = async (expenseData: Expense, token: string) => {
  if (!token) { 
    throw new Error("Token is missing.");
  }

  console.log("token in the expense service ", token);
  

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("config info ", config);

  console.log("expenseData ", expenseData);
  
  

  const response = await axios.post(expenseUrl, expenseData, config);
  return response.data;
};


const getMonthlyDetails = async (
  userId: string,
  year: number,
  month: number
): Promise<MonthlyDetails[]> => {
  try {
    const response = await axios.get<MonthlyDetails[]>(
      `${expenseUrl}/${userId}/monthly-details`,
      { params: { year, month } }
    );
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
  getMonthlyDetails,
};

