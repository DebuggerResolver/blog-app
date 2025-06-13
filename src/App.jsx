import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Form from "./components/form";
import ViewBlog from "./components/form"; // You can reuse Form for view

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/add" element={<Form />} />
        <Route path="/edit/:id" element={<Form dynamic />} />
        <Route path="/view/:id" element={<Form dynamic />} />
      </Routes>
  );
}

export default App;