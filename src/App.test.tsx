import './matchMediaMock';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

// Extend the type definition of JestMatchers<HTMLElement> to include toBeInTheDocument
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeInTheDocument(): R;
    }
  }
}

describe("App", () => {
  test('renders learn react link', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => { render(<App/>) });
    const linkElement = screen.getByText(/create react app/i);
    expect(linkElement).toBeInTheDocument(); // Use the toBeInTheDocument matcher
  });
})