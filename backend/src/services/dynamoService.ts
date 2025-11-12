import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { env } from "../config/env";

export type LogRecord = {
  log_id: string;
  user_id: string;
  action: "login" | "logout" | "signup" | "delete" | "approve";
  timestamp: string;
  meta?: Record<string, any>;
};

function initDynamoDBClient() {
  const isLocal = env.TARGET_ENV === "local";

  const client = new DynamoDBClient({
    apiVersion: "2012-08-10",
    endpoint: isLocal ? env.DYNAMODB_ENDPOINT : undefined,
    region: env.AWS_REGION,
    maxAttempts: 3,
    requestHandler: new NodeHttpHandler({
      connectionTimeout: 500,
      socketTimeout: 500,
    }),
  });

  return DynamoDBDocumentClient.from(client);
}

const docClient = initDynamoDBClient();

/**
 * ログを保存
 */
export async function saveLog(
  userId: string,
  action: LogRecord["action"],
  meta?: Record<string, any>
) {
  // uuid を動的 import
  const { v4: uuidv4 } = await import("uuid");

  const log: LogRecord = {
    log_id: uuidv4(),
    user_id: userId,
    action,
    timestamp: new Date().toISOString(),
    meta,
  };

  await docClient.send(
    new PutItemCommand({
      TableName: env.DYNAMODB_LOG_TABLE,
      Item: {
        log_id: { S: log.log_id },
        user_id: { S: log.user_id },
        action: { S: log.action },
        timestamp: { S: log.timestamp },
        meta: { S: JSON.stringify(meta || {}) },
      },
    })
  );

  return log;
}
