import db from "@spbook/db";
import type { AuthorPatch } from "./author-models";

export async function updateAuthorHandler(id: string, req: AuthorPatch) {
  const author = await db.author.findUnique({
    where: {
      id,
    },
  });
  if (!author) {
    throw new Error("Author not found");
  }
  return await db.author.update({
    where: {
      id,
    },
    data: {
      name: req.name,
      bio: req.bio,
      dateOfBirth: req.dateOfBirth,
      image:
        req.image?.name ?? "https://avatars.githubusercontent.com/u/124599?v=4",
    },
    select: {
      id: true,
    },
  });
}
