import { useState } from 'react';
import { useItems } from '../../context/ItemsContext';

const Form = () => {
  const { addItem } = useItems();
  const [formData, setFormData] = useState({
    head: '',
    content: '',
    tags: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(formData); // Add item to context
    setFormData({
      head: '',
      content: '',
      tags: [],
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      head: '',
      content: '',
      tags: [],
    });
  };

  const handleFormChange = (e) => {
    const { name, value, options } = e.target;

    if (name === 'tags') {
      const selectedTags = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({ ...prev, tags: selectedTags }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1.5rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
      }}
      onSubmit={handleSubmit}
    >
      <label
        htmlFor="head"
        style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#333',
        }}
      >
        Header
      </label>
      <input
        id="head"
        name="head"
        value={formData.head}
        placeholder="Enter the header"
        onChange={handleFormChange}
        required
        type="text"
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <label
        htmlFor="tags"
        style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#333',
        }}
      >
        Tags
      </label>
      <select
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleFormChange}
        multiple
        required
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <option value="tag1">Tag 1</option>
        <option value="tag2">Tag 2</option>
        <option value="tag3">Tag 3</option>
        <option value="tag4">Tag 4</option>
        <option value="tag5">Tag 5</option>
      </select>

      <label
        htmlFor="content"
        style={{
          fontWeight: 'bold',
          fontSize: '1rem',
          color: '#333',
        }}
      >
        Content
      </label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        placeholder="Enter the content"
        onChange={handleFormChange}
        required
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minHeight: '100px',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
        <button
          type="reset"
          onClick={handleReset}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;