// To start using a schema, rename this file to schema.ts
import { defineSchema, defineTable, s } from "convex/schema";

export default defineSchema({
  messages: defineTable({
    author: s.string(),
    body: s.string(),
  }),
  counters: defineTable({
    name: s.string(),
    counter: s.number(),
  }),
  trip: defineTable({
    id: s.number(),
    name: s.string(),
    date: s.string(),
    title: s.string(),
    origin: s.string(),
    destination: s.string(),
    distance: s.number(),
    mode: s.string(),
    emission: s.number(),
  })
});
