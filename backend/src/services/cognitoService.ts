import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  AdminDeleteUserCommand,
  AdminConfirmSignUpCommand,
  ListUsersCommand,
  AuthFlowType,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "../config/env";

const client = new CognitoIdentityProviderClient({
  region: env.AWS_REGION,
  endpoint: env.COGNITO_ENDPOINT,
});

/**
 * ユーザー登録
 */
export async function signupCognitoUser(email: string, password: string) {
  const command = new SignUpCommand({
    ClientId: env.COGNITO_CLIENT_ID,
    Username: email,
    Password: password,
  });
  return await client.send(command);
}

/**
 * ログイン
 */
export async function loginCognitoUser(email: string, password: string) {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  const response = await client.send(command);
  return {
    accessToken: response.AuthenticationResult?.AccessToken,
    idToken: response.AuthenticationResult?.IdToken,
    refreshToken: response.AuthenticationResult?.RefreshToken,
  };
}

/**
 * ログアウト
 */
export async function logoutCognitoUser(accessToken: string) {
  const command = new GlobalSignOutCommand({
    AccessToken: accessToken,
  });
  await client.send(command);
  return { message: "User logged out successfully" };
}

/**
 * 退会
 */
export async function deleteCognitoUser(email: string) {
  const command = new AdminDeleteUserCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: email,
  });
  await client.send(command);
  return { message: `User ${email} deleted successfully` };
}

/**
 * ユーザー一覧
 */
export async function listCognitoUsers() {
  const command = new ListUsersCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Limit: 50,
  });
  const response = await client.send(command);
  return response.Users || [];
}

/**
 * ユーザー承認（サインアップ承認）
 */
export async function approveCognitoUser(email: string) {
  const command = new AdminConfirmSignUpCommand({
    UserPoolId: env.COGNITO_USER_POOL_ID,
    Username: email,
  });
  await client.send(command);
  return { message: `User ${email} approved successfully` };
}
