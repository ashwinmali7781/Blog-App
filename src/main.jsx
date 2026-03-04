// import React from "react";
// import ReactDOM from "react-dom/client";
// import { ClerkProvider } from "@clerk/clerk-react";
// import App from "./App";

// const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ClerkProvider publishableKey={clerkPubKey}>
//     <App />
//   </ClerkProvider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
