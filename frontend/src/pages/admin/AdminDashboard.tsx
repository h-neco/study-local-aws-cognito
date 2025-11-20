import { useEffect, useState } from "react";

interface CognitoUser {
  Username: string;
  Attributes: { Name: string; Value: string }[];
  Enabled: boolean;
  UserStatus: string;
  UserCreateDate: string;
  UserLastModifiedDate: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<CognitoUser[]>([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("accessToken");

  const fetchUsers = async () => {
    if (!token) {
      setError("ログインしてください");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "ユーザー一覧取得に失敗しました");
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "ネットワークエラー");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (email: string) => {
    if (!token) return;
    await fetch("http://localhost:3000/admin/promote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email }),
    });
    fetchUsers(); // 更新
  };

  const handleDemote = async (email: string) => {
    if (!token) return;
    await fetch("http://localhost:3000/admin/demote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email }),
    });
    fetchUsers();
  };

  const handleDelete = async (email: string) => {
    if (!token) return;
    if (!confirm(`${email} を削除しますか？`)) return;

    await fetch("http://localhost:3000/admin/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: email }),
    });
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">管理者ダッシュボード</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/6 px-4 py-2 border-b text-left">Email</th>
              <th className="w-1/12 px-4 py-2 border-b text-left">Admin</th>
              <th className="w-1/12 px-4 py-2 border-b text-left">Status</th>
              <th className="w-1/12 px-4 py-2 border-b text-left">Enabled</th>
              <th className="w-1/6 px-4 py-2 border-b text-left">作成日</th>
              <th className="w-1/6 px-4 py-2 border-b text-left">最終更新日</th>
              <th className="w-1/6 px-4 py-2 border-b text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isAdmin =
                user.Attributes.find((a) => a.Name === "custom:isAdmin")
                  ?.Value === "true";

              const email = user.Attributes.find(
                (a) => a.Name === "email"
              )?.Value;

              return (
                <tr key={user.Username} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b truncate">{email}</td>
                  <td className="px-4 py-2 border-b">
                    {isAdmin ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b">{user.UserStatus}</td>
                  <td className="px-4 py-2 border-b">
                    {user.Enabled ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-b truncate">
                    {new Date(user.UserCreateDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b truncate">
                    {new Date(user.UserLastModifiedDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="flex gap-2 flex-wrap">
                      {isAdmin ? (
                        <button
                          onClick={() => handleDemote(email)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          権限剥奪
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePromote(email)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          管理者にする
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(email)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
