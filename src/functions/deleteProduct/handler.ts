import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { dynamo } from "../../helper/helper";
import schema from "./schema";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {

  const Product = await dynamo
    .get({
      TableName: process.env.productTable,
      Key: { id: event.body.id },
    })
    .promise();

  if (Object.keys(Product).length !== 0) {
    console.log(Product);

    const result = await dynamo
      .delete({
        TableName: process.env.productTable,
        Key: { id: event.body.id },
      })
      .promise();

    return formatJSONResponse({
      message: `Product deleted`,
    });
  } else {
    return formatJSONResponse({
      message: `Product not found`,
    });
  }
};

export const main = middyfy(hello);
