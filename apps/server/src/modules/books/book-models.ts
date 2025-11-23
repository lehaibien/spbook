import { t } from "elysia";

export type BookResponse = {
  id: string;
  isbn: string;
  slug: string;
  title: string;
  description: string;
  language: string;
  images: string[];
  publisher: string;
  authors: string[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const bookRequestSchema = t.Object({
  isbn: t.String(),
  title: t.String(),
  description: t.String(),
  language: t.String(),
  images: t.Files({
    maxSize: "5m",
    type: "image/*",
  }),
  publisherId: t.String({
    format: "uuid",
  }),
  // authors: t.Array(
  //   t.String({
  //     format: "uuid",
  //   })
  // ),
  // categories: t.Array(
  //   t.String({
  //     format: "uuid",
  //   })
  // ),
  authors: t.String(), // TODO: find a way to change to array
  categories: t.String(), // TODO: find a way to change to array
});

export type BookRequest = typeof bookRequestSchema.static;
