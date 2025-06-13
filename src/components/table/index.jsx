import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Table = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);
  const navigate=useNavigate();
  return (
    <table
      style={{
        width: "80%",
        borderCollapse: "collapse",
        margin: "20px auto",
      }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>#</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Heading</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Content</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Tags</th>
          <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {index }
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {blog.head}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {blog.content}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {blog.tags.join(", ")}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <MdDelete
                  style={{
                    color: "#038cfc",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const updatedBlogs = blogs.filter((_, i) => i !== index);
                    setBlogs(updatedBlogs);
                    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
                  }} />
                  <CiEdit 
                    style={{
                    color: "#038cfc",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/edit/${index}`)}
                />
                <FaEye
                  style={{ color: "#038cfc", cursor: "pointer" }}
                  onClick={() => navigate(`/view/${index}`)}
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="5"
              style={{
                textAlign: "center",
                padding: "8px",
                border: "1px solid #ccc",
              }}
            >
              No blogs available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
