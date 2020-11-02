import AuthenticationButtons from "./AuthenticationButtons";
import { render, screen } from "@testing-library/react";

test("renders the login and signup buttons", () => {
  render(<AuthenticationButtons />);

  screen.getByRole("button", { name: /Log in/i });
  screen.getByRole("button", { name: /Sign up/i });
});

