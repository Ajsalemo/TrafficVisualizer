import { render, screen } from "@testing-library/react";
import MapWrapper from "./MapWrapper";

test("renders the input form", () => {
  render(<MapWrapper />);
  const inputFormSpan = screen.getByText(/Search by address or location name./i);
  expect(inputFormSpan).toBeInTheDocument();
});
