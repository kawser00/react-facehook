import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProfilePage />} path="/me" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
};

export default App;
