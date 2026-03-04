import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    api.getPostById(id).then((post) => {
      setForm({
        title: post.title,
        summary: post.summary,
        content: post.content,
        tags: post.tags?.join(", ") || "",
      });
    });
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await api.updatePost(id, payload);

      navigate(`/posts/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-10">
      <form
        onSubmit={onSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">
          Edit Post
        </h2>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <input
          value={form.summary}
          onChange={(e) =>
            setForm({ ...form, summary: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <textarea
          rows="8"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <input
          value={form.tags}
          onChange={(e) =>
            setForm({ ...form, tags: e.target.value })
          }
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          Update Post
        </button>
      </form>
    </section>
  );
}
