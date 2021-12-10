import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { dynamo } from "../../helper/helper";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const data = await dynamo
    .get({
      TableName: process.env.orderTable,
      Key: { orderId: event.body.orderId },
    })
    .promise();
  // let body = await dynamo.scan({ TableName: "HamzaTable" }).promise();

  return formatJSONResponse({
    message: data,
  });
};

export const main = middyfy(hello);
