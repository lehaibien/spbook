import db from "@spbook/db";
import type { CategoryPatch } from "./category-models";

export async function updateCategoryHandler(id: string, req: CategoryPatch) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return await db.category.update({
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
