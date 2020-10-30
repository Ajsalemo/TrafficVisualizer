import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders the navigation links", () => {
  render(<Navbar />, { wrapper: MemoryRouter });
  const dashboardLinkElement = screen.getByRole("link", { name: /Dashboard/i });
  const signInLinkElement = screen.getByRole("link", { name: /Sign in/i });
  expect(dashboardLinkElement).toBeInTheDocument();
  expect(signInLinkElement).toBeInTheDocument();
});
