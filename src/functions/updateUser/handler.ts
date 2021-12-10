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
  await dynamo
    .update({
      TableName: process.env.userTable,
      Key: { email: event.body.email },
      UpdateExpression:
        "set emailVerified= :emailVerified, createdDate= :createdDate, firstName= :firstName, lastName= :lastName, dateOfBirth= :dateOfBirth",
      ExpressionAttributeValues: {
        ":createdDate": event.body.createdDate,
        ":emailVerified": event.body.emailVerified,
        ":firstName": event.body.firstName,
        ":lastName": event.body.lastName,
        ":dateOfBirth": event.body.dateOfBirth,
      },
    })
    .promise();
  return formatJSONResponse({
    message: "user updated",
  });
}
  

};

export const main = middyfy(hello);
