export default {
  type: "object",
  properties: {
    id: { type: "string" },
    createdDate: { type: "string" },
    email: { type: "string" },
    emailVerified: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    dateOfBirth: { type: "string" },
  },
  // required: [],
} as const;
