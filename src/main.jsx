import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BlogsStore from "./context/store-blogs";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BlogsStore>
        <App />
      </BlogsStore>
    </BrowserRouter>
  </StrictMode>
);
