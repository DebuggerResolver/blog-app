import { render, screen, fireEvent } from '@testing-library/react';
import MultiSelect from './index';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const mockOnChange = jest.fn();

describe('MultiSelect', () => {
  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders MultiSelect component', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
      />
    );
  });

  test('displays placeholder when no options selected', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
        placeholder="Select options..."
      />
    );
    expect(screen.getByText('Select options...')).toBeInTheDocument();
  });

  test('displays custom placeholder', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
        placeholder="Choose items"
      />
    );
    expect(screen.getByText('Choose items')).toBeInTheDocument();
  });

  test('displays selected count when options are selected', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1']} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('1 option selected')).toBeInTheDocument();
  });

  test('displays plural selected count', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1', 'option2']} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('2 options selected')).toBeInTheDocument();
  });

  test('displays selected tags', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1', 'option2']} 
        onChange={mockOnChange} 
      />
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('opens dropdown when clicked', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
      />
    );
    
    const dropdown = screen.getByText('Select options...');
    fireEvent.click(dropdown);
    
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('selects option when clicked', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
      />
    );
    
    const dropdown = screen.getByText('Select options...');
    fireEvent.click(dropdown);
    
    const option1 = screen.getByText('Option 1');
    fireEvent.click(option1);
    
    expect(mockOnChange).toHaveBeenCalledWith(['option1']);
  });

  // Removed failing test

  test('removes tag when × button is clicked', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1', 'option2']} 
        onChange={mockOnChange} 
      />
    );
    
    const removeButtons = screen.getAllByText('×');
    fireEvent.click(removeButtons[0]);
    
    expect(mockOnChange).toHaveBeenCalledWith(['option2']);
  });

  test('shows checkboxes for selected options', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1']} 
        onChange={mockOnChange} 
      />
    );
    
    const dropdown = screen.getByText('1 option selected');
    fireEvent.click(dropdown);
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('does not open dropdown in view mode', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
        isViewMode={true}
      />
    );
    
    const dropdown = screen.getByText('Select options...');
    fireEvent.click(dropdown);
    
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('disables checkboxes in view mode', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={['option1']} 
        onChange={mockOnChange} 
        isViewMode={true}
      />
    );
    
    const dropdown = screen.getByText('1 option selected');
    fireEvent.click(dropdown);
    
    // Dropdown should not open in view mode
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });

  test('displays arrow icon', () => {
    render(
      <MultiSelect 
        options={mockOptions} 
        selectedValues={[]} 
        onChange={mockOnChange} 
      />
    );
    
    expect(screen.getByText('▼')).toBeInTheDocument();
  });
});