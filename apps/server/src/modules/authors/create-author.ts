import db from "@spbook/db";
import { uploadFile } from "@/libs/rust-fs";
import type { AuthorRequest } from "./author-models";

export async function createAuthorHandler(req: AuthorRequest) {
  const imageKey = await uploadFile(req.image);
  if (!imageKey) {
    throw new Error("Failed to upload image");
  }
  const result = await db.author.create({
    data: {
      ...req,
      image: imageKey,
    },
    select: {
      id: true,
    },
  });

  return result;
}
