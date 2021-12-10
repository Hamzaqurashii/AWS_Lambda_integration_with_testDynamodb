export default {
  type: "object",
  properties: {
    orderId: { type: "string" },
    products: { type: "array" },
    totalPrice: { type: "number" },
    userID: { type: "string" },
    userName: { type: "string" },
  },
  // required: [],
} as const;
