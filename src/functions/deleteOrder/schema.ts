export default {
  type: "object",
  properties: {
    orderId: { type: "string" },
  },
  required: [ "orderId"],
} as const;
