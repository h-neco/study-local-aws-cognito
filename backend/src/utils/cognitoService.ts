// src/utils/cognitoService.ts
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminInitiateAuthCommand,
  AdminUserGlobalSignOutCommand,
  AdminDeleteUserCommand,
  ListUsersCommand,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "../config/env";

const isLocal = env.TARGET_ENV === "local";

const client = new CognitoIdentityProviderClient({
  region: env.AWS_REGION,
  endpoint: isLocal ? env.COGNITO_ENDPOINT : undefined,
  credentials: isLocal
    ? {
        accessKeyId: "mock",
        secretAccessKey: "mock",
      }
    : undefined,
});

// -----------------------
// ユーザー操作（auth用）
// -----------------------
export async function signupCognitoUser(
  username: string,
  password: string,
  email: string
) {
  const command = new SignUpCommand({
    ClientId: env.COGNITO_CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });
  return client.send(command);
}

export async function loginCognitoUser(username: string, password: string) {
  const command = new AdminInitiateAuthCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    ClientId: env.COGNITO_CLIENT_ID,
    AuthFlow: "ADMIN_NO_SRP_AUTH",
    AuthParameters: { USERNAME: username, PASSWORD: password },
  });
  return client.send(command);
}

export async function logoutCognitoUser(username: string) {
  const command = new AdminUserGlobalSignOutCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: username,
  });
  return client.send(command);
}

export async function deleteCognitoUser(username: string) {
  const command = new AdminDeleteUserCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: username,
  });
  return client.send(command);
}

// -----------------------
// 管理者操作（admin用）
// -----------------------

// ユーザー一覧取得
export async function listCognitoUsers() {
  const command = new ListUsersCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
  });
  const resp = await client.send(command);
  return resp.Users || [];
}

// ユーザー承認（確認済みステータスにする）
export async function approveCognitoUser(username: string) {
  const command = new AdminUpdateUserAttributesCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: username,
    UserAttributes: [{ Name: "email_verified", Value: "true" }],
  });
  return client.send(command);
}

// ユーザー削除（admin用）
export async function deleteCognitoUserAdmin(username: string) {
  return deleteCognitoUser(username);
}
