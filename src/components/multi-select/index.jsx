import { useState,memo } from "react";

const MultiSelect =memo( ({ options, selectedValues, onChange, placeholder = "Select options...",isViewMode }) => {
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
  });
  
  export default MultiSelect;