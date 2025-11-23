import { t } from "elysia";

export type AuthorResponse = {
  id: string;
  name: string;
  bio: string;
  dateOfBirth: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const AuthorRequestSchema = t.Object({
  name: t.String({
    minLength: 3,
    maxLength: 100,
  }),
  bio: t.String({
    minLength: 3,
  }),
  dateOfBirth: t.Date(),
  image: t.File({
    type: "image/*",
    maxSize: "5m",
  }),
});

export const AuthorPatchSchema = t.Partial(AuthorRequestSchema);

export type AuthorRequest = typeof AuthorRequestSchema.static;
export type AuthorPatch = typeof AuthorPatchSchema.static;
