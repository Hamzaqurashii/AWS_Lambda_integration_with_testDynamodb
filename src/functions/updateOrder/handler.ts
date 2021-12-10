import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import schema from "./schema";
import { dynamo } from "../../helper/helper";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  await dynamo
    .update({
      TableName: process.env.orderTable,
      Key: { orderId: event.body.orderId },
      UpdateExpression:
        "set products= :products, totalPrice= :totalPrice, userID= :userID, userName= :userName",
      ExpressionAttributeValues: {
        ":products": event.body.products,
        ":totalPrice": event.body.totalPrice,
        ":userID": event.body.userID,
        ":userName": event.body.userName,
      },
    })
    .promise();

  return formatJSONResponse({
    message: `updated`,
   
  });
};

export const main = middyfy(hello);
