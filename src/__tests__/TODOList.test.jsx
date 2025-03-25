import { render, screen, fireEvent } from '@testing-library/react';
import TODOList from '../components/TODOList';

describe('TODOList component', () => {
  it('shows the empty state when no todos exist', () => {
    render(<TODOList todos={[]} setTodos={() => {}} />);
    expect(screen.getByText(/seems lonely/i)).toBeInTheDocument();
  });

  it('renders a todo with the correct title', () => {
    const todo = { id: '1', title: 'Buy milk', is_completed: false };
    render(<TODOList todos={[todo]} setTodos={() => {}} />);

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('calls setTodos when completing a todo', () => {
    const todo = { id: '1', title: 'Walk dog', is_completed: false };
    const setTodosMock = vi.fn();
    render(<TODOList todos={[todo]} setTodos={setTodosMock} />);

    const toggleButton = screen.getByRole('button', { name: /walk dog/i });
    fireEvent.click(toggleButton);

    expect(setTodosMock).toHaveBeenCalledTimes(1);
  });

  it('enters edit mode when edit button is clicked', () => {
    const todo = { id: '1', title: 'Do laundry', is_completed: false };
    render(<TODOList todos={[todo]} setTodos={() => {}} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Check if input appears
    expect(screen.getByDisplayValue('Do laundry')).toBeInTheDocument();
  });

  it('deletes a todo when delete button is clicked', () => {
    const todo = { id: '1', title: 'Sleep early', is_completed: false };
    const setTodosMock = vi.fn();
    render(<TODOList todos={[todo]} setTodos={setTodosMock} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(setTodosMock).toHaveBeenCalledTimes(1);
    const updated = setTodosMock.mock.calls[0][0]([todo]);
    expect(updated).toEqual([]);
  });
});
