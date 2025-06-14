// Polyfill for TextEncoder and TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Table from './index';
import { BlogsContext } from '../../context/store-blogs/index';

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdDelete: ({ onClick, style }) => (
    <button onClick={onClick} style={style} data-testid="delete-icon">
      Delete
    </button>
  )
}));

jest.mock('react-icons/ci', () => ({
  CiEdit: ({ onClick, style }) => (
    <button onClick={onClick} style={style} data-testid="edit-icon">
      Edit
    </button>
  )
}));

jest.mock('react-icons/fa', () => ({
  FaEye: ({ onClick, style }) => (
    <button onClick={onClick} style={style} data-testid="view-icon">
      View
    </button>
  )
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock localStorage
const mockLocalStorage = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

const mockBlogs = [
  {
    head: 'First Blog',
    content: 'First blog content',
    tags: ['tag1', 'tag2']
  },
  {
    head: 'Second Blog',
    content: 'Second blog content',
    tags: ['tag3']
  }
];

const mockSetBlogs = jest.fn();

const renderWithContext = (blogs = [], setBlogs = mockSetBlogs) => {
  return render(
    <BrowserRouter>
      <BlogsContext.Provider value={{ blogs, setBlogs }}>
        <Table />
      </BlogsContext.Provider>
    </BrowserRouter>
  );
};

describe('Table', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockSetBlogs.mockClear();
    mockLocalStorage.setItem.mockClear();
  });

  test('renders Table component', () => {
    renderWithContext([]);
  });

  test('renders table headers', () => {
    renderWithContext([]);
    
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('displays "No blogs available" when blogs array is empty', () => {
    renderWithContext([]);
    expect(screen.getByText('No blogs available')).toBeInTheDocument();
  });

  test('renders blogs data correctly', () => {
    renderWithContext(mockBlogs);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('First Blog')).toBeInTheDocument();
    expect(screen.getByText('Second Blog')).toBeInTheDocument();
    expect(screen.getByText('First blog content')).toBeInTheDocument();
    expect(screen.getByText('Second blog content')).toBeInTheDocument();
    expect(screen.getByText('tag1, tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
  });

  test('renders action icons for each blog', () => {
    renderWithContext(mockBlogs);
    
    const deleteIcons = screen.getAllByTestId('delete-icon');
    const editIcons = screen.getAllByTestId('edit-icon');
    const viewIcons = screen.getAllByTestId('view-icon');
    
    expect(deleteIcons).toHaveLength(2);
    expect(editIcons).toHaveLength(2);
    expect(viewIcons).toHaveLength(2);
  });

  test('deletes blog when delete icon is clicked', () => {
    renderWithContext(mockBlogs, mockSetBlogs);
    
    const deleteIcons = screen.getAllByTestId('delete-icon');
    fireEvent.click(deleteIcons[0]);
    
    const expectedUpdatedBlogs = [mockBlogs[1]];
    expect(mockSetBlogs).toHaveBeenCalledWith(expectedUpdatedBlogs);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('blogs', JSON.stringify(expectedUpdatedBlogs));
  });

  test('navigates to edit page when edit icon is clicked', () => {
    renderWithContext(mockBlogs);
    
    const editIcons = screen.getAllByTestId('edit-icon');
    fireEvent.click(editIcons[0]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/edit/0');
  });

  test('navigates to view page when view icon is clicked', () => {
    renderWithContext(mockBlogs);
    
    const viewIcons = screen.getAllByTestId('view-icon');
    fireEvent.click(viewIcons[1]);
    
    expect(mockNavigate).toHaveBeenCalledWith('/view/1');
  });

  test('applies correct table styles', () => {
    renderWithContext([]);
    
    const table = screen.getByRole('table');
    expect(table).toHaveStyle({
      width: '80%',
      borderCollapse: 'collapse',
      margin: '20px auto'
    });
  });

  test('applies correct cell styles', () => {
    renderWithContext(mockBlogs);
    
    const cells = screen.getAllByRole('cell');
    cells.forEach(cell => {
      expect(cell).toHaveStyle({
        border: '1px solid #ccc',
        padding: '8px'
      });
    });
  });

  test('no blogs message spans all columns', () => {
    renderWithContext([]);
    
    const noDataCell = screen.getByText('No blogs available');
    expect(noDataCell).toHaveAttribute('colSpan', '5');
  });
});