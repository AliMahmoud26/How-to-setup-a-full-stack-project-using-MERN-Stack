import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("/api/users/register", {
        email,
        password,
      });
      console.log(res.data);
      setMessage(res.data.message);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-3 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-3 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer hover:bg-blue-700">
          Register
        </button>
        {message && <p className="mt-3 text-gray-900">{message}</p>}
      </form>
    </div>
  );
}

export default App;