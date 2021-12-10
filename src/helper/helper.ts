import * as AWS from "aws-sdk";
export const randomString = (length, chars) => {
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
export const dynamo = new AWS.DynamoDB.DocumentClient({
  region: "localhost",

  endpoint: "http://localhost:8000",
});
