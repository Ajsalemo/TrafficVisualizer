import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dummy temporary text', () => {
  render(<App />);
  const textElement = screen.getByText(/TrafficVisualizer/i);
  expect(textElement).toBeInTheDocument();
});
