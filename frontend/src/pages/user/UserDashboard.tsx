// src/pages/user/UserDashboard.tsx
import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // ここでは簡易的に localStorage から email を取得
    // 実際は AccessToken を解析してユーザー情報を取り出す
    const storedEmail = localStorage.getItem("userEmail");
    setEmail(storedEmail);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザーダッシュボード</h1>

      {email ? (
        <p className="mb-4">ようこそ、{email}さん</p>
      ) : (
        <p className="mb-4">ログイン情報を取得中...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold mb-2">プロフィール</h2>
          <p>メールアドレスやパスワードの変更が可能です。</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="font-semibold mb-2">その他の情報</h2>
          <p>ここにダッシュボード用のコンテンツを追加できます。</p>
        </div>
      </div>
    </div>
  );
}
