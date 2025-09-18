import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import background_img from "../../assets/loginPage_bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Frontend validations
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await authService.login({ email, password });
      login(res.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{ backgroundImage: `url(${background_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded shadow-md w-120">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
};

export default Login;
