import Elysia, { t } from "elysia";
import { paginationRequestSchema } from "@/models/common";
import { CategoryPatchSchema, CategoryRequestSchema } from "./category-models";
import { createCategoryHandler } from "./create-category";
import { getCategoryHandler } from "./get-category";
import { updateCategoryHandler } from "./update-category";

export const categoryModule = new Elysia().group("/categories", (app) =>
  app
    .get("/", ({ query }) => getCategoryHandler(query), {
      query: paginationRequestSchema,
    })
    .post("/", ({ body }) => createCategoryHandler(body), {
      body: CategoryRequestSchema,
      parse: "multipart/form-data",
    })
    .patch(
      "/:id",
      ({ params: { id }, body }) => updateCategoryHandler(id, body),
      {
        params: t.Object({
          id: t.String({
            format: "uuid",
          }),
        }),
        body: CategoryPatchSchema,
        parse: "multipart/form-data",
      }
    )
);
