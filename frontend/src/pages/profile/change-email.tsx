import { useState } from "react";

export default function ChangeEmailPage() {
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const res = await fetch("http://localhost:3000/auth/update-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newEmail }),
    });

    if (!res.ok) {
      setMessage("メール変更に失敗しました");
      return;
    }

    setMessage("確認リンクを送信しました。新しいメールを確認してください。");
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">メールアドレス変更</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border w-full px-3 py-2"
          placeholder="new@example.com"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          更新する
        </button>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
