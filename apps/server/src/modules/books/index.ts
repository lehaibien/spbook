import Elysia from "elysia";
import { paginationRequestSchema } from "@/models/common";
import { bookRequestSchema } from "./book-models";
import { createBookHandler } from "./create-book";
import { getBooksHandler } from "./get-books";

export const bookModule = new Elysia().group("/books", (app) =>
  app
    .get("/", ({ query }) => getBooksHandler(query), {
      query: paginationRequestSchema,
    })
    .post("/", ({ body }) => createBookHandler(body), {
      body: bookRequestSchema,
      parse: "multipart/form-data",
    })
);
