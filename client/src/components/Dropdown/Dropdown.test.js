import { fireEvent, render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown";
import { MemoryRouter } from "react-router-dom";

test("renders the dropdown button", () => {
  render(<Dropdown />, { wrapper: MemoryRouter });

  screen.getByRole("button", { name: /Dropdown button/i });
});

test("should fire an event on click", (done) => {
  render(<Dropdown />, { wrapper: MemoryRouter });
  const handleClick = () => done();

  const button = screen.getByRole("button", { name: /Dropdown button/i });
  fireEvent.click(button, handleClick());
});

test("should fire an event on blur", (done) => {
  render(<Dropdown />, { wrapper: MemoryRouter });
  const handleBlur = () => done();

  const button = screen.getByRole("button", { name: /Dropdown button/i });
  fireEvent.blur(button, handleBlur());
});
