import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "@/api/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // URLの email を初期値に反映
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  // ログイン済みなら /user/dashboard へ
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/user/dashboard");
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data: any = await login({ email, password });

      // accessToken 保存
      localStorage.setItem("accessToken", data.accessToken);

      // ログイン成功時
      navigate("/user/dashboard");
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">ログイン</h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
              placeholder="•••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? "送信中..." : "ログイン"}
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
