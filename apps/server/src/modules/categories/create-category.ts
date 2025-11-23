import db from "@spbook/db";
import type { CategoryRequest } from "./category-models";

export async function createCategoryHandler(req: CategoryRequest) {
  return await db.category.create({
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
