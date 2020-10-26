import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders the initial loading placeholder', () => {
  render(<Home />);
  const textElement = screen.getByText(/Loading.../i);
  expect(textElement).toBeInTheDocument();
});
