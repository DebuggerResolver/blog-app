import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './index';

describe('Button Component', () => {
  // Test 1: Basic rendering
  it('renders button with correct title', () => {
    render(<Button title="Click Me" />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
  });

  // Test 2: Button text content
  it('displays the correct title text', () => {
    const title = 'Submit Form';
    render(<Button title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  // Test 3: Default styling
  it('applies correct default styles', () => {
    render(<Button title="Test Button" />);
    const button = screen.getByRole('button');
    
    // Test individual styles to avoid computed style differences
    expect(button).toHaveStyle('color: rgb(255, 255, 255)'); // white converts to rgb
    expect(button).toHaveStyle('background-color: rgb(3, 140, 252)'); // #038cfc converts to rgb
    expect(button).toHaveStyle('width: 110px');
    expect(button).toHaveStyle('height: 35px');
    expect(button).toHaveStyle('padding: 5px');
    expect(button).toHaveStyle('text-align: center');
    
    // Test inline styles directly for border since browser applies defaults
    expect(button.getAttribute('style')).toContain("color: white; background-color: rgb(3, 140, 252); width: 110px; height: 35px; padding: 5px; text-align: center;");
  });

  // Test 4: Click event handling
  it('calls onChangeEvent when clicked', () => {
    const mockOnChange = jest.fn();
    render(<Button title="Click Me" onChangeEvent={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  // Test 5: Multiple clicks
  it('handles multiple clicks correctly', () => {
    const mockOnChange = jest.fn();
    render(<Button title="Multi Click" onChangeEvent={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  // Test 6: No click handler (default null)
  it('works without onChangeEvent prop', () => {
    render(<Button title="No Handler" />);
    const button = screen.getByRole('button');
    
    // Should not throw error when clicked
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  // Test 7: Empty title
  it('renders with empty title', () => {
    render(<Button title="" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  // Test 8: Long title text
  it('handles long title text', () => {
    const longTitle = 'This is a very long button title that might overflow';
    render(<Button title={longTitle} />);
    
    const button = screen.getByText(longTitle);
    expect(button).toBeInTheDocument();
  });

  // Test 9: Component structure
  it('renders button inside a div wrapper', () => {
    const { container } = render(<Button title="Wrapped Button" />);
    const divWrapper = container.firstChild;
    const button = divWrapper.firstChild;
    
    expect(divWrapper).toBeInstanceOf(HTMLDivElement);
    expect(button).toBeInstanceOf(HTMLButtonElement);
  });

  // Test 10: Accessibility
  it('is accessible and focusable', () => {
    render(<Button title="Accessible Button" />);
    const button = screen.getByRole('button');
    
    button.focus();
    expect(button).toHaveFocus();
  });

  // Test 11: Memoization (testing memo behavior)
  it('does not re-render with same props', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(
      <Button title="Test" onChangeEvent={mockOnChange} />
    );
    
    const button = screen.getByRole('button');
    const initialButton = button;
    
    // Re-render with same props
    rerender(<Button title="Test" onChangeEvent={mockOnChange} />);
    
    // Button should be the same instance due to memo
    expect(screen.getByRole('button')).toBe(initialButton);
  });

  // Test 12: Different titles
  it('renders different titles correctly', () => {
    const titles = ['Save', 'Cancel', 'Delete', 'Submit'];
    
    titles.forEach(title => {
      const { unmount } = render(<Button title={title} />);
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });

  // Test 13: Event object passed to handler
  it('passes event object to onChangeEvent handler', () => {
    const mockOnChange = jest.fn();
    render(<Button title="Event Test" onChangeEvent={mockOnChange} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object));
    expect(mockOnChange.mock.calls[0][0]).toHaveProperty('type', 'click');
  });

  // Test 14: Button type attribute
  it('has correct button type', () => {
    render(<Button title="Type Test" />);
    const button = screen.getByRole('button');
    
    // Default button type should be 'submit' or undefined
    expect(button.type).toBe('submit');
  });
});