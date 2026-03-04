import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");   // redirect to homepage
  };

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-blue-300"
        >
          Technical Blog
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-300">

          <Link
            to="/create"
            className="hover:text-white transition"
          >
            Write Post
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Logout ({user.name})
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}
