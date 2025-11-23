import { t } from "elysia";

export const paginationRequestSchema = t.Object({
  page: t.Number({
    minimum: 1,
    default: 1,
    examples: [1],
    description: "Page number",
    error: "Page number must be greater than 0",
  }),
  pageSize: t.Number({
    maximum: 100,
    minimum: 1,
    default: 10,
    examples: [10, 25, 50, 100],
    description: "Page size",
    error: "Page size must be between 1 and 100",
  }),
  search: t.Optional(
    t.String({
      default: "",
      examples: [""],
      description: "Search keyword",
    })
  ),
});

export type PaginationRequest = typeof paginationRequestSchema.static;
