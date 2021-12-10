export default {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    dateOfBirth: { type: "string" },
    email: { type: "string" },
    emailVerified: { type: "string" },
    createdDate: { type: "string" },
  },
  required: [ "email", "firstName", "lastName"],
} as const;
