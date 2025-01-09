import axios from "axios";

const loginUrl = "https://backend-wispy-firefly-9646.fly.dev/api/login";

let token: string | null = null;

token = null;


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

// Set token for API calls
const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

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

export { login, setToken };

