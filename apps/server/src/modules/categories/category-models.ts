import { t } from "elysia";

export type CategoryResponse = {
  id: string;
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const CategoryRequestSchema = t.Object({
  name: t.String({
    minLength: 3,
  }),
  image: t.File({
    type: "image/*",
    maxSize: "5m",
  }),
});

export const CategoryPatchSchema = t.Partial(CategoryRequestSchema);

export type CategoryRequest = typeof CategoryRequestSchema.static;
export type CategoryPatch = typeof CategoryPatchSchema.static;
