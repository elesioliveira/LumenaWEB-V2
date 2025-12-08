import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../module/auth/AuthPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
