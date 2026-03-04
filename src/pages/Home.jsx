import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getPosts()
      .then(setPosts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Build. Learn. Share.
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            A platform for developers to share technical knowledge,
            tutorials, and coding experiences.
          </p>

          <Link
            to="/create"
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            Write Your First Post
          </Link>
        </div>
      </section>

      {/* Posts Section */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Latest Technical Articles
        </h2>

        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-gray-400">
            No posts yet. Be the first to share knowledge 🚀
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-3">
                  {post.summary}
                </p>

                <small className="text-gray-400 block mb-3">
                  By {post.author?.name || "Anonymous"}
                </small>

                <Link
                  to={`/posts/${post._id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
