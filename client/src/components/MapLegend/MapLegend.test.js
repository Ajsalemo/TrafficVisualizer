import { render, screen } from "@testing-library/react";
import MapLegend from "./MapLegend";

test("renders the map legend", () => {
  render(<MapLegend />);
  const firstSpanElement = screen.getByText(/Free flowing traffic/i);
  const secondSpanElement = screen.getByText(/Moderate congestion/i);
  const thirdSpanElement = screen.getByText(/Heavy congestion/i);
  expect(firstSpanElement).toBeInTheDocument();
  expect(secondSpanElement).toBeInTheDocument();
  expect(thirdSpanElement).toBeInTheDocument();
});
