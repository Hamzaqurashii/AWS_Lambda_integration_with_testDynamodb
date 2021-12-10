import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { dynamo } from "../../helper/helper";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {

  const user = await dynamo
    .get({
      TableName: process.env.userTable,
      Key: { email: event.body.email },
    })
    .promise();

  if (Object.keys(user).length !== 0) {
    console.log(user);

    const result = await dynamo
      .delete({
        TableName: process.env.userTable,
        Key: { email: event.body.email },
      })
      .promise();

    return formatJSONResponse({
      message: `user deleted`,
    });
  } else {
    return formatJSONResponse({
      message: `user not found`,
    });
  }
};

export const main = middyfy(hello);
