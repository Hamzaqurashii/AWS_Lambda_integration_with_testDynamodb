import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { dynamo } from "../../helper/helper";
import schema from "./schema";
import { randomString } from "../../helper/helper";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const user = await dynamo
    .get({
      TableName: process.env.userTable,
      Key: { email: event.body.email },
    })
    .promise();

  if (Object.keys(user).length === 0) {
    if (
      event.body.firstName === undefined ||
      event.body.lastName === undefined
    ) {
      return formatJSONResponse({
        message: `Missing Required Information`,
      });
    } else {
      const result = await dynamo
        .put({
          TableName: process.env.userTable,
          Item: {
            ...event.body,
            id: randomString(
              100,
              "abcdefghigjklmnopqrstuvwxyzAbcdefgh12364839847#$^&(*(&%$#`"
            ),
          },
        })
        .promise();

      return formatJSONResponse({
        message: `user created`,
      });
    }
  } else {
    return formatJSONResponse({
      message: `Email already taken`,
    });
  }
};

export const main = middyfy(hello);
