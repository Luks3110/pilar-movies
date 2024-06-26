import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
  renderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const QueryClientWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export {
  screen,
  render,
  fireEvent,
  waitFor,
  act,
  userEvent,
  renderHook,
  QueryClientWrapper,
};
