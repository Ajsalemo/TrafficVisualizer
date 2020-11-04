import SaveLocationButton from "./SaveLocationButton";
import { render, screen } from "@testing-library/react";

test("renders the save location button", () => {
  render(<SaveLocationButton />);

  screen.getByRole("button", { name: /Save location/i });
});

