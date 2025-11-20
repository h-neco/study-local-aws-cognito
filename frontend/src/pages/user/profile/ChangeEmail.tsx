import { useState } from "react";

export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setMessage("ログイン情報がありません。");
      return;
    }

    const res = await fetch("http://localhost:3000/auth/update-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        newEmail,
        accessToken,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(
        "確認メールを送信しました。メール内のリンクをクリックして更新を完了してください。"
      );
    } else {
      setMessage(data.error || "メール変更に失敗しました");
    }
  }

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
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          送信する
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-green-600">{message}</div>
      )}
    </div>
  );
}
