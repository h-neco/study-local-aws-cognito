import { Link } from "react-router-dom";

export default function HomePage() {
  // localStorage に保存されているトークンで判定
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">ようこそ！</h1>
        <p className="mb-6">あなたはログイン済みです。</p>

        <div className="space-y-4">
          <Link
            to="/profile"
            className="block w-64 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            プロフィールを見る
          </Link>

          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload(); // 簡易的にログアウト反映
            }}
            className="block w-64 text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            ログアウト
          </button>
        </div>
      </div>
    );
  }

  // ログインしていない場合
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
