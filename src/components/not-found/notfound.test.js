import { render, screen } from '@testing-library/react';
import NotFound from './index';

describe('NotFound', () => {
  test('renders NotFound component', () => {
    render(<NotFound />);
  });

  test('displays "Not Found | 404" text', () => {
    render(<NotFound />);
    expect(screen.getByText('Not Found | 404')).toBeInTheDocument();
  });

  test('renders as h1 element', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Not Found | 404');
  });

  test('applies correct inline styles', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', { level: 1 });
    
    expect(heading).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      fontWeight: 'bolder'
    });
  });
});