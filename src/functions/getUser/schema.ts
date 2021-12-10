export default {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["lastName", "age", "email", "address"],
} as const;
