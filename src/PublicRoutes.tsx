import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/Registration";
import LoginPage from "./pages/Login";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Routes>
  );
};
