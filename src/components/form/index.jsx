import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import MultiSelect from '../../components/multi-select';
import {BlogsContext} from '../../context/store-blogs/index';
import {memo} from 'react';
import { useCallback } from "react";
const options = [
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "finance", label: "Finance" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "news", label: "News" },

];


const Form = memo(({dynamic=null}) => {
  const {blogs,setBlogs}=useContext(BlogsContext);

  const { id } = useParams();
  const [formData, setFormData] = useState({
    head: "",
    content: "",
    tags: [],
  });
  const navigate=useNavigate();
  const location=useLocation();
    useEffect(() => {
      if (id !== undefined) {
        if (blogs.length>id) {
          setFormData(blogs[id]);
        }
      }
    }, [id]);
    
const handleSubmit = useCallback((e) => {
  e.preventDefault();
  if (!formData.head.trim() || !formData.content.trim() || formData.tags.length === 0) {
    alert('Please fill in all fields and select at least one tag.');
    return;
  }

  if (id !== undefined) {
    // Edit mode: update the existing blog at index 'id'
    const arr = [...blogs];
    arr[id] = formData;
    setBlogs(arr);
  } else {
    // Add mode: add a new blog
    const updatedBlogsData = [...blogs, { ...formData }];
    setBlogs(updatedBlogsData);
  }

  setFormData({
    head: "",
    content: "",
    tags: [],
  });
  navigate("/");
}, [formData, id, blogs, setBlogs, navigate]);

  const handleBackClick=useCallback(()=>{
    navigate('/');
  },[navigate]);

  const handleReset = useCallback((e) => {
    e.preventDefault();
    setFormData({
      head: "",
      content: "",
      tags: [],
    });
  },[]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = useCallback((newTags) => {
    setFormData((prev) => ({ ...prev, tags: newTags }));
  },[]);

  const isViewMode = location.pathname.startsWith("/view");
  let heading = "Create Blog";
  if (location.pathname.startsWith("/edit")) {
    heading = `Edit Blog : #BlogNumber${parseInt(id, 10) + 1}`;
  } else if (location.pathname.startsWith("/view")) {
    heading = `View Blog : #BlogNumber${parseInt(id, 10) + 1}`;
  }
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <button
        onClick={handleBackClick}
        style={{
          position: "fixed",
          top: "2rem",
          left: "2rem",
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          border: "2px solid #007bff",
          backgroundColor: "white",
          color: "#007bff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease",
          zIndex: 1001,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#007bff";
          e.target.style.color = "white";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#007bff";
          e.target.style.transform = "scale(1)";
        }}
        title="Back to Home"
      >
        ←
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "500px",
          margin: "2rem auto",
          padding: "1.5rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}>
          {heading}
        </h2>

        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Header
        </label>
        <input
          name="head"
          value={formData.head}
          placeholder="Enter the header"
          onChange={handleFormChange}
          type="text"
          disabled={isViewMode}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Tags
        </label>
        <MultiSelect
          options={options}
          isViewMode={isViewMode}
          selectedValues={formData.tags}
          onChange={handleTagsChange}
          placeholder="Select categories..."
        />

        <label
          style={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: "#333",
          }}
        >
          Content
        </label>
        <textarea
          name="content"
          value={formData.content}
          placeholder="Enter the content"
          onChange={handleFormChange}
          disabled={isViewMode}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            minHeight: "100px",
            resize: "vertical",
          }}
        />
      {!isViewMode  &&
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            onClick={handleSubmit}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Submit
          </button>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              color: "#fff",
              backgroundColor: "#dc3545",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
          >
            Reset
          </button>
        </div>
        }
      </div>
    </div>
  );
});

export default Form;