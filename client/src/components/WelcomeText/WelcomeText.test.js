import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import WelcomeText from "./WelcomeText";

test("renders the landing page text", () => {
  render(<WelcomeText />, { wrapper: MemoryRouter })
  const textElement = screen.getByText(/TrafficVisualizer/i);
  expect(textElement).toBeInTheDocument();
});

