export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
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

        <div className="text-center mt-4">
          <a href="/signup" className="text-sm text-blue-600 hover:underline">
            アカウントを作成する
          </a>
        </div>
      </div>
    </div>
  );
}
