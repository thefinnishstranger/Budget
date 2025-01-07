import { useState } from "react";
import { login } from "../services/accountService";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Updated from username to email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Budget"
            src="/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const credentials = { email, password };
              login(credentials)
                .then((data) => {
                  window.localStorage.setItem("loggedUser", JSON.stringify(data)); // Save full user data
                  console.log("Login successful:", data);
                  navigate("/account");
                  window.location.reload();
                })
                .catch((error) => console.error("Login error:", error));
              setEmail("");
              setPassword("");
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 border border-black"
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 border border-black"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-white font-semibold shadow-sm hover:bg-green-400 focus:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up here!
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
