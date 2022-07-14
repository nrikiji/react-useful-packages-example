import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { QueryClient, QueryClientProvider } from "react-query";
import { FC } from "react";

export const TestProvider: FC<{ children: React.ReactNode }> = (props) => {
  const queryClient = new QueryClient();
  let store = configureStore({
    reducer: { auth: authReducer },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{props.children}</Provider>
    </QueryClientProvider>
  );
};
