import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

const MultiSelect = ({ options, selectedValues, onChange, placeholder = "Select options...",isViewMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    onChange(newSelectedValues);
  };

  const removeTag = (valueToRemove) => {
    const newSelectedValues = selectedValues.filter(v => v !== valueToRemove);
    onChange(newSelectedValues);
  };

  const getSelectedLabels = () => {
    return selectedValues.map(value => 
      options.find(option => option.value === value)?.label || value
    );
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Selected tags display */}
      {selectedValues.length > 0 && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.5rem"
        }}>
          {getSelectedLabels().map((label, index) => (
            <span
              key={`${selectedValues[index]}-${index}`}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.25rem 0.5rem",
                borderRadius: "12px",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              {label}
              <button
                type="button"
                onClick={() => removeTag(selectedValues[index])}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: isViewMode ? "not-allowed" : "pointer",
                  padding: "0",
                  fontSize: "1rem",
                  lineHeight: "1"
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      
      {/* Dropdown trigger */}
      <div
        onClick={() => { if (!isViewMode) handleToggle(); }}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: isViewMode ? "not-allowed" : "pointer",
          backgroundColor: isViewMode ? "#f3f3f3" : "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "40px"
        }}
      >
        <span style={{ color: selectedValues.length === 0 ? "#999" : "#333" }}>
          {selectedValues.length === 0 
            ? placeholder 
            : `${selectedValues.length} option${selectedValues.length > 1 ? 's' : ''} selected`
          }
        </span>
        <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          ▼
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderTop: "none",
          borderRadius: "0 0 4px 4px",
          maxHeight: "200px",
          overflowY: "auto",
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{
                padding: "0.5rem",
                cursor: isViewMode ? "not-allowed" : "pointer",
                backgroundColor: selectedValues.includes(option.value) ? "#e3f2fd" : "white",
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
              onMouseEnter={(e) => {
                if (!selectedValues.includes(option.value)) {
                  e.target.style.backgroundColor = "#f5f5f5";
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedValues.includes(option.value)) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                readOnly
                disabled={isViewMode}
                style={{ pointerEvents: "none" }}
              />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Form = ({dynamic=null}) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    head: "",
    content: "",
    tags: [],
  });
  const navigate=useNavigate();
  const location=useLocation();
    // Preload blog data if editing or viewing
    useEffect(() => {
      if (id !== undefined) {
        const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
        const blog = blogs[id];
        if (blog) {
          setFormData(blog);
        }
      }
    }, [id]);
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.head.trim() || !formData.content.trim() || formData.tags.length === 0) {
        alert('Please fill in all fields and select at least one tag.');
        return;
      }
    
      const blogsData = JSON.parse(localStorage.getItem("blogs") || "[]");
    
      if (id !== undefined) {
        // Edit mode: update the existing blog at index 'id'
        blogsData[id] = { ...formData };
        localStorage.setItem("blogs", JSON.stringify(blogsData));
      } else {
        // Add mode: add a new blog
        const updatedBlogsData = [...blogsData, { ...formData }];
        localStorage.setItem("blogs", JSON.stringify(updatedBlogsData));
      }
    
      setFormData({
        head: "",
        content: "",
        tags: [],
      });
      navigate("/");
    };
  const handleBackClick=()=>{
    navigate('/');
  }
  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      head: "",
      content: "",
      tags: [],
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (newTags) => {
    setFormData((prev) => ({ ...prev, tags: newTags }));
  };

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
};

export default Form;