import ProfileImage from "./ProfileImage";
import { render, screen } from "@testing-library/react";

test("renders the login and signup buttons", () => {
  render(<ProfileImage />);

  screen.getByRole("img", { name: /User avatar/i });
});

