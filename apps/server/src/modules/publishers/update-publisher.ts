import db from "@spbook/db";
import type { PublisherPatch } from "./publisher-models";

export async function updatePublisherHandler(id: string, req: PublisherPatch) {
  const publisher = await db.publisher.findUnique({
    where: {
      id,
    },
  });
  if (!publisher) {
    throw new Error("Publisher not found");
  }
  return await db.publisher.update({
    where: {
      id,
    },
    data: {
      name: req.name,
      image:
        req.image?.name ?? "https://avatars.githubusercontent.com/u/124599?v=4",
    },
    select: {
      id: true,
    },
  });
}
