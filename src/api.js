const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const readToken = () => localStorage.getItem("tb_token");

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = readToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server returned invalid JSON. Check backend API.");
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export const api = {
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getPosts: () => request("/posts"),

  getPostById: (id) => request(`/posts/${id}`),

  createPost: (payload) =>
    request("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
