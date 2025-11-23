import Elysia, { t } from "elysia";
import { paginationRequestSchema } from "@/models/common";
import { AuthorPatchSchema, AuthorRequestSchema } from "./author-models";
import { createAuthorHandler } from "./create-author";
import { getAuthorHandler } from "./get-author";
import { updateAuthorHandler } from "./update-author";

export const authorModule = new Elysia().group("/authors", (app) =>
  app
    .get("/", ({ query }) => getAuthorHandler(query), {
      query: paginationRequestSchema,
    })
    .post("/", ({ body }) => createAuthorHandler(body), {
      body: AuthorRequestSchema,
      parse: "multipart/form-data",
    })
    .patch(
      "/:id",
      ({ params: { id }, body }) => updateAuthorHandler(id, body),
      {
        params: t.Object({
          id: t.String({
            format: "uuid",
          }),
        }),
        body: AuthorPatchSchema,
        parse: "multipart/form-data",
      }
    )
);
