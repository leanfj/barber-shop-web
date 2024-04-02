import "./matchMediaMock";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

// Extend the type definition of JestMatchers<HTMLElement> to include toBeInTheDocument
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      toBeInTheDocument(): R;
    }
  }
}

describe("App", () => {
  test("renders learn react link", async () => {
    await act(async () => {
      // eslint-disable-next-line react/react-in-jsx-scope
      render(<App />);
    });
    const linkElement = screen.getByText(/create react app/i);
    expect(linkElement).toBeInTheDocument(); // Use the toBeInTheDocument matcher
  });
});
