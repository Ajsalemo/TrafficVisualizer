import { render, screen } from '@testing-library/react';
import LoadingPageComponent from './LoadingPageComponent';

test('renders the initial loading placeholder', () => {
  render(<LoadingPageComponent />);
  const textElement = screen.getByLabelText(/loading/i);
  expect(textElement).toBeInTheDocument();
});
