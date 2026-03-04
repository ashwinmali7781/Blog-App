import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", summary: "", content: "", tags: "" });
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError("Please login to publish posts.");
      return;
    }

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      const created = await api.createPost(payload);
      navigate(`/posts/${created._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">Write Technical Post</h2>

        {error && <p className="text-red-400">{error}</p>}

        <input
          placeholder="Title"
          required
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Summary"
          required
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
        />

        <textarea
          placeholder="Explain your concept, architecture, or code walkthrough..."
          required
          rows={10}
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <input
          placeholder="Tags (comma-separated)"
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Publish
        </button>
      </form>
    </section>
  );
}
