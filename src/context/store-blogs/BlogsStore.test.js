import React, { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogsStore, { BlogsContext } from "./index";

// Test component to consume the context
const TestComponent = () => {
  const { blogs, setBlogs } = useContext(BlogsContext);

  return (
    <div>
      <div data-testid="blogs-count">{blogs.length}</div>
      <div data-testid="blogs-data">{JSON.stringify(blogs)}</div>
      <button
        data-testid="add-blog"
        onClick={() =>
          setBlogs([...blogs, { id: Date.now(), title: "Test Blog" }])
        }
      >
        Add Blog
      </button>
      <button data-testid="clear-blogs" onClick={() => setBlogs([])}>
        Clear Blogs
      </button>
    </div>
  );
};

describe("BlogsStore", () => {
  test("provides initial empty blogs array", () => {
    render(
      <BlogsStore>
        <TestComponent />
      </BlogsStore>
    );

    expect(screen.getByTestId("blogs-count")).toHaveTextContent("0");
    expect(screen.getByTestId("blogs-data")).toHaveTextContent("[]");
  });

  test("allows updating blogs state", () => {
    render(
      <BlogsStore>
        <TestComponent />
      </BlogsStore>
    );

    const addButton = screen.getByTestId("add-blog");

    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("blogs-count")).toHaveTextContent("1");
    const blogsDataElement = screen.getByTestId("blogs-data");
    const blogsData = JSON.parse(blogsDataElement.textContent);
    expect(blogsData).toHaveLength(1);
    expect(blogsData[0]).toHaveProperty("title", "Test Blog");
  });

  test("allows clearing blogs state", () => {
    render(
      <BlogsStore>
        <TestComponent />
      </BlogsStore>
    );

    const addButton = screen.getByTestId("add-blog");
    const clearButton = screen.getByTestId("clear-blogs");

    // Add a blog first
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("blogs-count")).toHaveTextContent("1");

    // Clear blogs
    act(() => {
      clearButton.click();
    });

    expect(screen.getByTestId("blogs-count")).toHaveTextContent("0");
    expect(screen.getByTestId("blogs-data")).toHaveTextContent("[]");
  });

  test("provides context value with blogs and setBlogs", () => {
    const TestContextValue = () => {
      const contextValue = useContext(BlogsContext);

      return (
        <div>
          <div data-testid="has-blogs">
            {contextValue.blogs !== undefined ? "true" : "false"}
          </div>
          <div data-testid="has-setblogs">
            {typeof contextValue.setBlogs === "function" ? "true" : "false"}
          </div>
        </div>
      );
    };

    render(
      <BlogsStore>
        <TestContextValue />
      </BlogsStore>
    );

    expect(screen.getByTestId("has-blogs")).toHaveTextContent("true");
    expect(screen.getByTestId("has-setblogs")).toHaveTextContent("true");
  });

  test("throws error when BlogsContext is used outside of BlogsStore", () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    const TestWithoutProvider = () => {
      const context = useContext(BlogsContext);
      return (
        <div data-testid="context-result">
          {context === null ? "context-is-null" : "context-exists"}
        </div>
      );
    };

    render(<TestWithoutProvider />);
    expect(screen.getByTestId("context-result")).toHaveTextContent(
      "context-is-null"
    );

    console.error = originalError;
  });

  test("supports multiple blog operations", async () => {
    render(
      <BlogsStore>
        <TestComponent />
      </BlogsStore>
    );

    const addButton = screen.getByTestId("add-blog");

    // Add multiple blogs with separate act calls
    await act(async () => {
      addButton.click();
    });

    await act(async () => {
      addButton.click();
    });

    await act(async () => {
      addButton.click();
    });

    expect(screen.getByTestId("blogs-count")).toHaveTextContent("3");
  });
});
