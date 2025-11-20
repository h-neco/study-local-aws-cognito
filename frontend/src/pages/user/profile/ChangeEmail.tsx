import { useState } from "react";
import { updateEmail } from "@/api/auth";

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setMessage("ログイン情報がありません。");
      setLoading(false);
      return;
    }

    try {
      await updateEmail(newEmail);
      setMessage(
        "確認メールを送信しました。メール内のリンクをクリックして更新を完了してください。"
      );
    } catch (err: any) {
      console.log(err);
      setMessage(err.response?.data?.error || "メール変更に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">メールアドレス変更</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">新しいメールアドレス</label>
          <input
            type="email"
            className="border w-full p-2 rounded"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "送信中..." : "送信する"}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 text-center ${
            message.includes("確認メール") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
