import ProfileImage from "./ProfileImage";
import { render, screen } from "@testing-library/react";

test("renders the user's profile image", () => {
  render(<ProfileImage />);

  screen.getByRole("img", { name: /User avatar/i });
});

