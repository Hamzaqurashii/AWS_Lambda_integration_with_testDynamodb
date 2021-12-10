export default {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    categories: { type: "string" },
  },
  required: ["email"],
} as const;