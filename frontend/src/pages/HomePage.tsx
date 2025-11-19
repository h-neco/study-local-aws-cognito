// src/pages/HomePage.tsx
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // すでにログイン済みなら自動リダイレクト
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  // ログインしていない場合の表示
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Welcome!</h1>
      <div className="space-y-4">
        <Link
          to="/login"
          className="block w-64 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          ユーザーログイン
        </Link>

        <Link
          to="/signup"
          className="block w-64 text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          新規登録
        </Link>

        <Link
          to="/admin/login"
          className="block w-64 text-center bg-gray-800 hover:bg-black text-white py-2 rounded-lg"
        >
          管理者ログイン
        </Link>
      </div>
    </div>
  );
}
