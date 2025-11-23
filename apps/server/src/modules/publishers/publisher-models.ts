import { t } from "elysia";

export type PublisherResponse = {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const PublisherRequestSchema = t.Object({
  name: t.String({
    minLength: 3,
  }),
  image: t.File({
    type: "image/*",
    maxSize: "5m",
  }),
});

export const PublisherPatchSchema = t.Partial(PublisherRequestSchema);

export type PublisherRequest = typeof PublisherRequestSchema.static;
export type PublisherPatch = typeof PublisherPatchSchema.static;
