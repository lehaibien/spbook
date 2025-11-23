import { t } from "elysia";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const UserRequestSchema = t.Object({
  name: t.String({
    minLength: 3,
  }),
  email: t.String({
    format: "email",
  }),
  password: t.String({
    minLength: 6,
  }),
  image: t.File({
    type: "image/*",
    maxSize: "5m",
  }),
});

export const UserPatchSchema = t.Partial(UserRequestSchema);

export type UserRequest = typeof UserRequestSchema.static;
export type UserPatch = typeof UserPatchSchema.static;
