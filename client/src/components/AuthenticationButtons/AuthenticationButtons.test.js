import AuthenticationButtons from "./AuthenticationButtons";
import { render, screen } from "@testing-library/react";


test("renders the loading icon before the avatar is displayed", () => {
  render(<AuthenticationButtons />);
  // This specific loading icon is exposed by the Auth0 SDK before the avabar/buttons are rendered
  const authenticatedButtonLoadingIcon = screen.getByLabelText(/loading/i);
  expect(authenticatedButtonLoadingIcon).toBeInTheDocument();
});
