// See [Project Structure](../../../README.md#project-structure)
import type { APIGatewayProxyResult } from "aws-lambda";

export function handler(): Promise<APIGatewayProxyResult> {
  return Promise.resolve({
    body: "Hello World",
    statusCode: 200,
  });
}
