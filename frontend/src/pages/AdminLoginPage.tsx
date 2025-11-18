export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          管理者ログイン
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              管理者メール
            </label>
            <input
              type="email"
              className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              パスワード
            </label>
            <input
              type="password"
              className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-gray-700 text-white focus:ring focus:ring-blue-500"
              placeholder="•••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}
