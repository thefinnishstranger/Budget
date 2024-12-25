import axios from "axios";
const loginUrl = "http://localhost:5001/api/login";

let token = null;

// Login API call
const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials);
    console.log("Login successful:", response.data);
    setToken(response.data.token); // Set token immediately
    return response.data; // Return user data for state update
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Propagate error for handling
  }
};

// Set token for API calls
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Config for API calls with Authorization header
const config = () => ({
  headers: { Authorization: token },
});

export { login, setToken };
