import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);

  useEffect(() => {
    api.getPostById(id).then(setPost);
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.deletePost(id);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  if (!post) return <p className="text-white">Loading...</p>;

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>

      <p className="text-gray-400 mb-6">
        By {post.author?.name || "Anonymous"}
      </p>

      {/* Author Controls */}
      {user && user.id === post.author?._id && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}

      <p className="text-gray-300 mb-6">{post.summary}</p>

      <div className="text-gray-200 leading-relaxed">
        {post.content}
      </div>
    </article>
  );
}
