import { render, screen } from "@testing-library/react";
import DisplayMap from "./DisplayMap";

test("renders the map informational text", () => {
  render(<DisplayMap />);
  screen.getByText((content, node) => {
    const informationalMapText = (node) =>
      node.textContent === "Traffic data is updated every three(3) minutes.";
    const hasMapInfoText = informationalMapText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !informationalMapText(child)
    );

    return hasMapInfoText && childrenDontHaveText;
  });
});
