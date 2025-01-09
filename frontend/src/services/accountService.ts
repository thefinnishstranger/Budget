import axios from "axios";

const loginUrl = "https://backend-wispy-firefly-9646.fly.dev/api/login";
const registerUrl = "https://backend-wispy-firefly-9646.fly.dev/api/register";


let token: string | null = null;

// Set token for API calls
const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const getToken = (): string | null => {
  return token;
};

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

interface RegisterResponse {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Propagate error for handling
  }
};

const register = async (data: { firstName: string; lastName: string; email: string; password: string }): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(registerUrl, data);
    console.log("registration of the account was successful");
    return response.data
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export { login, setToken, getToken, register };

