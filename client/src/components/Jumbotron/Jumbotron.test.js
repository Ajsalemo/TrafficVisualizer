import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import Jumbotron from "./Jumbotron";

test("renders the nested component with landing page text", () => {
  render(<Jumbotron />, { wrapper: MemoryRouter })
  const jumbotronWelcomeText = screen.getByText(/TrafficVisualizer/i);
  expect(jumbotronWelcomeText).toBeInTheDocument();
});
