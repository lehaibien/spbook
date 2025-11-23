import Elysia from "elysia";
import { paginationRequestSchema } from "@/models/common";
import { getUserHandler } from "./get-users";

export const userModule = new Elysia().group(
  "/users",
  (app) =>
    app.get("/", ({ query }) => getUserHandler(query), {
      query: paginationRequestSchema,
    })
  // .post("/", ({ body }) => createCategoryHandler(body), {
  //   body: CategoryRequestSchema,
  //   parse: "multipart/form-data",
  // })
  // .patch(
  //   "/:id",
  //   ({ params: { id }, body }) => updateCategoryHandler(id, body),
  //   {
  //     params: t.Object({
  //       id: t.String({
  //         format: "uuid",
  //       }),
  //     }),
  //     body: CategoryPatchSchema,
  //     parse: "multipart/form-data",
  //   }
  // )
);
