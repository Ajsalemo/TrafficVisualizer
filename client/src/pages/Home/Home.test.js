import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders the initial loading placeholder', () => {
  render(<Home />);
  const loadingElement = screen.getByLabelText(/loading/i);
  expect(loadingElement).toBeInTheDocument();
});
