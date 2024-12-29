import axios from "axios";

const loginUrl = "http://localhost:5001/api/login";

let token: string | null = null;

console.log(token);


// Interface for login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Interface for login response
interface LoginResponse {
  token: string;
  email: string;
  name: string;
  userId: string;
}

// Login API call
const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(loginUrl, credentials);
    console.log("Login successful:", response.data);
    setToken(response.data.token); // Set token immediately
    return response.data; // Return user data for state update
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Propagate error for handling
  }
};

// Set token for API calls
const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

export { login, setToken };
