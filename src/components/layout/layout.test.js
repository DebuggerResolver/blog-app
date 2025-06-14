import { render, screen } from '@testing-library/react';
import Layout from './index';
import Header from '../header';
import Table from '../table';

// Mock the child components
jest.mock('../header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

jest.mock('../table', () => {
  return function MockTable() {
    return <div data-testid="table">Table Component</div>;
  };
});

describe('Layout', () => {
  test('renders Layout component', () => {
    render(<Layout />);
  });

  test('renders Header component', () => {
    render(<Layout />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('renders Table component', () => {
    render(<Layout />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  test('renders both Header and Table components', () => {
    render(<Layout />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });
});