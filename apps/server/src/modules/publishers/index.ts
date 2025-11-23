import Elysia, { t } from "elysia";
import { paginationRequestSchema } from "@/models/common";
import { createPublisherHandler } from "./create-publisher";
import { getPublisherHandler } from "./get-publisher";
import {
  PublisherPatchSchema,
  PublisherRequestSchema,
} from "./publisher-models";
import { updatePublisherHandler } from "./update-publisher";

export const publisherModule = new Elysia().group("/publishers", (app) =>
  app
    .get("/", ({ query }) => getPublisherHandler(query), {
      query: paginationRequestSchema,
    })
    .post("/", ({ body }) => createPublisherHandler(body), {
      body: PublisherRequestSchema,
      parse: "multipart/form-data",
    })
    .patch(
      "/:id",
      ({ params: { id }, body }) => updatePublisherHandler(id, body),
      {
        params: t.Object({
          id: t.String({
            format: "uuid",
          }),
        }),
        body: PublisherPatchSchema,
        parse: "multipart/form-data",
      }
    )
);
