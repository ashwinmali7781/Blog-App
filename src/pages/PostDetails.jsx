import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <p className="text-red-400 text-center mt-10">{error}</p>
    );
  }

  if (!post) {
    return (
      <p className="text-gray-400 text-center mt-10">Loading post...</p>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-10">

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>

      {/* Author + Date */}
      <p className="text-gray-400 mb-6">
        By {post.author?.name || "Anonymous"} •{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Summary */}
      <p className="text-gray-300 text-lg mb-6">
        {post.summary}
      </p>

      {/* Content */}
      <div className="text-gray-200 leading-relaxed space-y-4">
        {post.content}
      </div>

    </article>
  );
}
