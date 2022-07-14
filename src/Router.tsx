import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useAppSelector } from "./app/hooks";
import { selectToken } from "./features/auth/authSlice";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const PublicRoute = () => {
  const currentToken = useAppSelector(selectToken);
  if (currentToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const PrivateRoute = () => {
  const currentToken = useAppSelector(selectToken);
  if (!currentToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
