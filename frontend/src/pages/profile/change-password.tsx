import { useState } from "react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    const res = await fetch("http://localhost:3000/auth/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!res.ok) {
      setMessage("パスワード更新に失敗しました");
      return;
    }

    setMessage("パスワードを更新しました。再ログインしてください。");
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">パスワード変更</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border w-full px-3 py-2"
          placeholder="現在のパスワード"
        />

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border w-full px-3 py-2"
          placeholder="新しいパスワード"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          更新する
        </button>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
