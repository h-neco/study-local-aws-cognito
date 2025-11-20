import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/auth";

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await signup({ email: email, password: password });
      setMessage("登録成功！確認メールをチェックしてください。");
      setTimeout(() => navigate("/login"), 3000); // 2秒後ログイン画面へ
    } catch (err: any) {
      let msg = err.message || "サインアップに失敗しました";
      if (err.message === email) {
        msg = "登録済みのメールアドレスです。";
      }
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">新規登録</h2>

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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "登録中..." : "登録する"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("成功") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            ログイン画面へ戻る
          </a>
        </div>
      </div>
    </div>
  );
}
