import type { AWS } from "@serverless/typescript";

import createUser from "@functions/createUser";
import updateDocument from "@functions/updateUser";
import deleteDocument from "@functions/deleteUser";
import getDocument from "@functions/getUser";
import createProduct from "@functions/createProduct";
import deleteProduct from "@functions/deleteProduct";
import getProduct from "@functions/getProduct";
import updateProduct from "@functions/updateProduct";
import createOrder from "@functions/createOrder";
import deleteOrder from "@functions/deleteOrder";
import getOrder from "@functions/getOrder";
import updateOrder from "@functions/updateOrder";

const serverlessConfiguration: AWS = {
  service: "serverlesswithtypescript",
  frameworkVersion: "2",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      userTable: "${self:custom.userTable}",
      productTable: "${self:custom.productTable}",
      orderTable: "${self:custom.orderTable}",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: {
    createUser,
    updateDocument,
    deleteDocument,
    getDocument,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    createOrder,
    deleteOrder,
    updateOrder,
    getOrder,
  },
  package: { individually: true },
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        migrate: true,
        seed: true,
      },
    },
    userTable: "userTable",
    orderTable: "orderTable",
    productTable: "productTable",
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      userTable: {
        Type: "AWS::DynamoDB::Table",

        Properties: {
          TableName: "${self:custom.userTable}",

          AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],

          KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],

          BillingMode: "PAY_PER_REQUEST",
        },
      },
      productTable: {
        Type: "AWS::DynamoDB::Table",

        Properties: {
          TableName: "${self:custom.productTable}",

          AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],

          KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],

          BillingMode: "PAY_PER_REQUEST",
        },
      },
      orderTable: {
        Type: "AWS::DynamoDB::Table",

        Properties: {
          TableName: "${self:custom.orderTable}",

          AttributeDefinitions: [
            { AttributeName: "orderId", AttributeType: "S" },
          ],

          KeySchema: [{ AttributeName: "orderId", KeyType: "HASH" }],

          BillingMode: "PAY_PER_REQUEST",
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
