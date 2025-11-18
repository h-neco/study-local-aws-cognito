import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6"></h1>

      <div className="space-y-4">
        <Link
          to="/login"
          className="block text-center bg-blue-500 text-white px-4 py-2 rounded"
        >
          ユーザーログイン
        </Link>

        <Link
          to="/signup"
          className="block text-center bg-green-500 text-white px-4 py-2 rounded"
        >
          ユーザー新規登録
        </Link>

        <Link
          to="/admin/login"
          className="block text-center bg-gray-700 text-white px-4 py-2 rounded"
        >
          管理者ログイン
        </Link>
      </div>
    </div>
  );
}
