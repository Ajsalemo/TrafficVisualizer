import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders the landing page text", () => {
  render(<Navbar />, { wrapper: MemoryRouter });
  const homeLinkElement = screen.getByRole("link", { name: /Home/i });
  const apiLinkElement = screen.getByRole("link", { name: /API Reference/i });
  const searchLinkElement = screen.getByRole("link", { name: /Search/i });
  const signInLinkElement = screen.getByRole("link", { name: /Sign in/i });
  expect(homeLinkElement).toBeInTheDocument();
  expect(signInLinkElement).toBeInTheDocument();
  expect(apiLinkElement).toBeInTheDocument();
  expect(searchLinkElement).toBeInTheDocument();
});
