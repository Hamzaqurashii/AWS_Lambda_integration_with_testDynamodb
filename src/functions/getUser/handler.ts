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
      TableName: process.env.userTable,
      Key: { email: event.body.email },
    })
    .promise();
  if (Object.keys(data).length === 0) {
    return formatJSONResponse({
      message: "user not found",
    });
  } else {
    return formatJSONResponse({
      message: data,
    });
  }
};

export const main = middyfy(hello);
