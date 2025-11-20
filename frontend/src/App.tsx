import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Header from "./components/Header";
import UserDashboard from "./pages/user/UserDashboard";
import ChangeEmail from "./pages/user/profile/ChangeEmail";
import ChangePassword from "./pages/user/profile/ChangePassword";

// ログイン済みユーザー向けレイアウト
function UserLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* /user/* の各ページがここに入る */}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* User（ログイン後） */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile/change-email" element={<ChangeEmail />} />
        <Route path="profile/change-password" element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default App;
