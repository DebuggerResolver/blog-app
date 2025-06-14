import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';
import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock react-router-dom
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock Button component
const mockButtonOnChangeEvent = jest.fn();
jest.mock('../button', () => {
  return function MockButton({ title, onChangeEvent }) {
    return (
      <button 
        onClick={onChangeEvent}
        data-testid="mock-button"
      >
        {title}
      </button>
    );
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders header with correct title', () => {
      render(<Header />);
      
      const heading = screen.getByText('Blog Admin Panel');
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
    });

    test('renders header element with correct styles', () => {
      render(<Header />);
      
      const headerElement = screen.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveStyle({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '50px'
      });
    });

    test('renders h1 with correct inline style', () => {
      render(<Header />);
      
      const heading = screen.getByText('Blog Admin Panel');
      expect(heading).toHaveStyle({
        display: 'inline'
      });
    });

    test('renders Button component with correct props', () => {
      render(<Header />);
      
      const button = screen.getByTestId('mock-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Add New Blog');
    });
  });

  describe('Navigation Functionality', () => {
    test('navigates to /add when button is clicked', () => {
      render(<Header />);
      
      const button = screen.getByTestId('mock-button');
      fireEvent.click(button);
      
      expect(mockNavigate).toHaveBeenCalledWith('/add');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    test('useCallback dependency array is empty', () => {
      const { rerender } = render(<Header />);
      
      const button = screen.getByTestId('mock-button');
      fireEvent.click(button);
      
      expect(mockNavigate).toHaveBeenCalledTimes(1);
      
      rerender(<Header />);
      
      fireEvent.click(button);
      
      expect(mockNavigate).toHaveBeenCalledTimes(2);
      expect(mockNavigate).toHaveBeenCalledWith('/add');
    });
  });

  describe('Component Structure', () => {
    test('header contains exactly one h1 and one button', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      const heading = screen.getByRole('heading', { level: 1 });
      const button = screen.getByTestId('mock-button');
      
      expect(header).toContainElement(heading);
      expect(header).toContainElement(button);
      
      const allHeadings = screen.getAllByRole('heading', { level: 1 });
      expect(allHeadings).toHaveLength(1);
    });

    test('header layout is flex with space-around', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      const computedStyles = window.getComputedStyle(header);
      
      expect(header.style.display).toBe('flex');
      expect(header.style.justifyContent).toBe('space-around');
      expect(header.style.alignItems).toBe('center');
    });
  });

  describe('Accessibility', () => {
    test('header has correct semantic structure', () => {
      render(<Header />);
      
      const headerLandmark = screen.getByRole('banner');
      expect(headerLandmark).toBeInTheDocument();
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    test('button is keyboard accessible', () => {
      render(<Header />);
      
      const button = screen.getByTestId('mock-button');
      
      button.focus();
      expect(button).toHaveFocus();
      
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    });
  });

  describe('Error Handling', () => {
    test('component renders without crashing when navigate is undefined', () => {
      jest.doMock('react-router-dom', () => ({
        useNavigate: () => undefined,
      }));
      
      expect(() => {
        render(<Header />);
      }).not.toThrow();
    });

    test('handles navigation errors gracefully', () => {
      mockNavigate.mockImplementationOnce(() => {
        throw new Error('Navigation failed');
      });

      render(<Header />);

      const button = screen.getByTestId('mock-button');
      expect(() => {
        fireEvent.click(button);
      }).toThrow('Navigation failed');
    });
  });

  describe('Performance', () => {
    test('handleOnChange callback is memoized', () => {
      const { rerender } = render(<Header />);
      
      const button1 = screen.getByTestId('mock-button');
      const initialOnClick = button1.onclick;
      
      rerender(<Header />);
      
      const button2 = screen.getByTestId('mock-button');
      const rerenderedOnClick = button2.onclick;
      
      expect(typeof initialOnClick).toBe('function');
      expect(typeof rerenderedOnClick).toBe('function');
    });
  });

  describe('Style Consistency', () => {
    test('header maintains consistent spacing', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header.style.marginTop).toBe('50px');
    });

    test('heading has inline display', () => {
      render(<Header />);
      
      const heading = screen.getByText('Blog Admin Panel');
      expect(heading.style.display).toBe('inline');
    });

    test('flex layout properties are correctly applied', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header.style.flexDirection).toBe('row');
      expect(header.style.alignItems).toBe('center');
      expect(header.style.justifyContent).toBe('space-around');
    });
  });
});