import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders all main sections', () => {
    render(<App />);

    expect(screen.getByText(/task done/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write your next task/i)).toBeInTheDocument();
    expect(screen.getByText(/seems lonely/i)).toBeInTheDocument();
  });

  it('loads todos from localStorage on mount', () => {
    const mockTodos = [
      { id: '1', title: 'Test saved todo', is_completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(mockTodos));

    render(<App />);

    expect(screen.getByText('Test saved todo')).toBeInTheDocument();
  });
});
