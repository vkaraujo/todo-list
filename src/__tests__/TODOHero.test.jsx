import { render, screen } from '@testing-library/react';
import TODOHero from '../components/TODOHero';

describe('TODOHero component', () => {
  it('renders the static headings', () => {
    render(<TODOHero todos_completed={0} total_todos={0} />);

    expect(screen.getByText(/task done/i)).toBeInTheDocument();
    expect(screen.getByText(/keep it up/i)).toBeInTheDocument();
  });

  it('displays the correct number of completed todos', () => {
    render(<TODOHero todos_completed={3} total_todos={5} />);

    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('displays 0/0 when there are no todos', () => {
    render(<TODOHero todos_completed={0} total_todos={0} />);
    
    expect(screen.getByText('0/0')).toBeInTheDocument();
  });
});
