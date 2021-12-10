import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { dynamo } from "../../helper/helper";
import schema from "./schema";
import { randomString } from "../../helper/helper";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // const user = await dynamo
  // .get({
  //   TableName: "userTable",
  //   Key: { email: event.body.email },
  // })
  // .promise();

  // if (Object.keys(user).length !== 0) {
  //   console.log(user);

  //   // const result = await dynamo
  //   //   .delete({
  //   //     TableName: "userTable",
  //   //     Key: { id: event.body.id },
  //   //   })
  //   //   .promise();

  //   return formatJSONResponse({
  //     message: `user deleted`,
  //   });
  // } else {
  //   return formatJSONResponse({
  //     message: `user not found`,
  //   });
  // }

  const result = await dynamo
    .put({
      TableName: process.env.orderTable,
      Item: {
        ...event.body,
        orderId: randomString(
          100,
          "abcdefghigjklmnopqrstuvwxyzAbcdefgh12364839847#$^&(*(&%$#`"
        ),
      },
    })
    .promise();
  return formatJSONResponse({
    message: "Order placed.",
  });
};

export const main = middyfy(hello);
