import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout as apiLogout } from "@/api/auth";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const token = localStorage.getItem("accessToken");

  // /user 配下のみ表示したい場合はこれをON
  const isUserPage = location.pathname.startsWith("/user");
  if (!isUserPage) return null;

  /** --- ユーザー一覧取得 --- */
  const logout = async () => {
    try {
      await apiLogout();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch {
      console.log("logout error");
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex justify-between items-center relative">
      {/* 左：ロゴ */}
      <Link to="/user/dashboard" className="text-xl font-bold">
        Home
      </Link>

      {/* ハンバーガー（SP） */}
      <button
        className="md:hidden p-2 border rounded"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black mb-1" />
        <div className="w-5 h-0.5 bg-black" />
      </button>

      {/* PCメニュー */}
      <nav className="hidden md:flex items-center gap-6">
        {token && (
          <div className="relative">
            <button
              className="px-3 py-2 bg-gray-200 rounded"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              プロフィール
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded w-48">
                <Link
                  to="/user/profile/change-email"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  メールアドレス変更
                </Link>
                <Link
                  to="/user//profile/change-password"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  パスワード変更
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* スマホメニュー */}
      {menuOpen && (
        <div className="md:hidden absolute right-4 top-14 bg-white shadow rounded w-48 py-2">
          {token && (
            <>
              <Link
                to="/user/profile/change-email"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                メールアドレス変更
              </Link>
              <Link
                to="/user/profile/change-password"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                パスワード変更
              </Link>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                ログアウト
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
