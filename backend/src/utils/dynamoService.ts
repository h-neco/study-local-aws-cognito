import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { env } from "../config/env";

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

export async function saveUser(userId: string, data: any) {
  await docClient.send(
    new PutItemCommand({
      TableName: env.USER_TABLE,
      Item: {
        user_id: { S: userId },
        data: { S: JSON.stringify(data) },
      },
    })
  );
}

export async function getUser(userId: string) {
  const resp = await docClient.send(
    new GetItemCommand({
      TableName: env.USER_TABLE,
      Key: { user_id: { S: userId } },
    })
  );
  return resp.Item ? JSON.parse(resp.Item.data.S!) : null;
}
