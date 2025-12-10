import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../module/auth/AuthPage";
import HomePage from "../module/base/home/page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/Home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
