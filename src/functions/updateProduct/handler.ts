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
      TableName: process.env.productTable,
      Key: { id: event.body.id },
    })
    .promise();
  if (Object.keys(data).length === 0) {
    return formatJSONResponse({
      message: "Product not found",
    });
  } else {
    await dynamo
      .update({
        TableName: process.env.productTable,
        Key: { id: event.body.id },
        UpdateExpression:
          "set title= :title, description= :description, price= :price, categories= :categories",
        ExpressionAttributeValues: {
          ":title": event.body.title,
          ":description": event.body.description,
          ":price": event.body.price,
          ":categories": event.body.categories,
        },
      })
      .promise();

    return formatJSONResponse({
      message: `updated`,
    });
  }
};

export const main = middyfy(hello);
