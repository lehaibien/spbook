import db from "@spbook/db";
import type { PublisherRequest } from "./publisher-models";

export async function createPublisherHandler(req: PublisherRequest) {
  return await db.publisher.create({
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
