import { useEffect, useState, useCallback } from "react";
import {
  getUserList,
  promoteToAdmin,
  demoteAdmin,
  adminDeleteUser,
} from "@/api/admin";

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

  /** --- Utility: 属性からメール取得 --- */
  const getEmail = (user: CognitoUser): string | undefined =>
    user.Attributes.find((a) => a.Name === "email")?.Value;

  /** --- Utility: admin フラグ取得 --- */
  const isAdmin = (user: CognitoUser): boolean =>
    user.Attributes.find((a) => a.Name === "custom:isAdmin")?.Value === "true";

  /** --- ユーザー一覧取得 --- */
  const fetchUsers = useCallback(async () => {
    try {
      const res: any = await getUserList();
      if (!res) {
        setError("ユーザー一覧取得に失敗しました");
        return;
      }
      setUsers(res);
      setError("");
    } catch (err: any) {
      setError(err.message || "ネットワークエラー");
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  /** --- 操作共通ハンドラ（昇格・降格・削除） --- */
  const performAction = async (
    action: (email: string) => Promise<any>,
    email?: string,
    confirmMsg?: string
  ) => {
    if (!token || !email) return;

    if (confirmMsg && !confirm(confirmMsg)) return;
    await action(email);
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
              const email = getEmail(user);

              return (
                <tr key={user.Username} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b truncate">{email}</td>
                  <td className="px-4 py-2 border-b">
                    {isAdmin(user) ? "Yes" : "No"}
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
                      {isAdmin(user) ? (
                        <button
                          onClick={() => performAction(demoteAdmin, email)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded text-sm"
                        >
                          権限剥奪
                        </button>
                      ) : (
                        <button
                          onClick={() => performAction(promoteToAdmin, email)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                        >
                          管理者にする
                        </button>
                      )}

                      <button
                        onClick={() =>
                          performAction(
                            adminDeleteUser,
                            email,
                            `${email} を削除しますか？`
                          )
                        }
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
