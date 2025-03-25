import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';

describe('Form component (uncontrolled)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders input and button', () => {
    render(<Form todos={[]} setTodos={() => {}} />);
    expect(screen.getByPlaceholderText(/write your next task/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls setTodos with a new todo on submit', () => {
    const setTodosMock = vi.fn();
    render(<Form todos={[]} setTodos={setTodosMock} />);

    const input = screen.getByPlaceholderText(/write your next task/i);
    fireEvent.change(input, { target: { value: 'Walk the dog' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form, {
      target: {
        todo: { value: 'Walk the dog' },
      },
    });

    expect(setTodosMock).toHaveBeenCalledTimes(1);
    const newTodos = setTodosMock.mock.calls[0][0]([]);
    expect(newTodos[0].title).toBe('Walk the dog');
  });

  it('saves new todo to localStorage on submit', () => {
    render(<Form todos={[]} setTodos={() => {}} />);

    const input = screen.getByPlaceholderText(/write your next task/i);
    fireEvent.change(input, { target: { value: 'Buy milk' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form, {
      target: {
        todo: { value: 'Buy milk' },
      },
    });

    const stored = JSON.parse(localStorage.getItem('todos'));
    expect(stored[0].title).toBe('Buy milk');
  });

  it('resets the input after submit', () => {
    render(<Form todos={[]} setTodos={() => {}} />);

    const input = screen.getByPlaceholderText(/write your next task/i);
    fireEvent.change(input, { target: { value: 'Do laundry' } });

    const form = screen.getByRole('form');
    fireEvent.submit(form, {
      target: {
        todo: { value: 'Walk the dog' },
      },
    });

    expect(input.value).toBe('');
  });
});
