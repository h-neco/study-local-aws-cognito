// src/pages/user/UserDashboard.tsx
import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザーダッシュボード</h1>

      <p className="mb-4">Wellcome</p>

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
