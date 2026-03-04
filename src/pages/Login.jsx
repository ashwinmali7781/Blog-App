import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await api.login(form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">Login</h2>

        {error && <p className="text-red-400">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </section>
  );
}
