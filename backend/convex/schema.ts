// To start using a schema, rename this file to schema.ts
import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  messages: defineTable({
    body: s.string(),
    channel: s.id("channels"),
    user: s.id("users"),
  }),
  counters: defineTable({
    name: s.string(),
    counter: s.number(),
  }),
  trip: defineTable({
    from: s.string(),
    to: s.string(),
    distance: s.number(),
    mode: s.string(),
  }),
  users: defineTable({
    name: s.string(),
    tokenIdentifier: s.string(),
  }),
  channels: defineTable({
    name: s.string(),
  }),
});
