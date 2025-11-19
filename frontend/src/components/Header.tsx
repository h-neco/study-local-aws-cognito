import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const navigate = useNavigate();

  function logout() {
    const token = localStorage.getItem("accessToken");
    fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).finally(() => {
      localStorage.removeItem("accessToken");
      navigate("/login");
    });
  }

  return (
    <div className="relative">
      <button className="px-3 py-2 bg-gray-200 rounded">プロフィール</button>

      <div className="absolute right-0 mt-2 bg-white shadow rounded w-48">
        <a
          href="/profile/change-email"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          メールアドレス変更
        </a>
        <a
          href="/profile/change-password"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          パスワード変更
        </a>
        <button
          onClick={logout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
