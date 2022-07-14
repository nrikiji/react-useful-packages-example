import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAppSelector } from "./app/hooks";
import { selectToken } from "./features/auth/authSlice";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const PublicRoute: FC<{ children: React.ReactNode }> = (props) => {
  const currentToken = useAppSelector(selectToken);
  if (currentToken) {
    return <Navigate to="/" />;
  }
  return <>{props.children}</>;
};

const PrivateRoute: FC<{ children: React.ReactNode }> = (props) => {
  const currentToken = useAppSelector(selectToken);
  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return <>{props.children}</>;
};
