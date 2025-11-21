import { useState } from "react";
import { updatePassword } from "@/api/auth";

export default function ChangePassword() {
  const [previousPassword, setPreviousPassword] = useState("");
  const [proposedPassword, setProposedPassword] = useState("");
  const [proposedPasswordConfirm, setProposedPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (proposedPassword !== proposedPasswordConfirm) {
      setMessage("新しいパスワードが一致しません");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setMessage("ログイン情報がありません");
      return;
    }
    try {
      const res = await updatePassword(previousPassword, proposedPassword);
      if (res) {
        setMessage("パスワードを変更しました");
      } else {
        setMessage("パスワード変更に失敗しました");
      }
    } catch (e: any) {
      setMessage(e.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">パスワード変更</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">現在のパスワード</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">新しいパスワード</label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            value={proposedPassword}
            onChange={(e) => setProposedPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            新しいパスワード（確認）
          </label>
          <input
            type="password"
            className="border w-full p-2 rounded"
            value={proposedPasswordConfirm}
            onChange={(e) => setProposedPasswordConfirm(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          変更する
        </button>
      </form>

      {message && (
        <div className="mt-4 text-center text-green-600">{message}</div>
      )}
    </div>
  );
}
