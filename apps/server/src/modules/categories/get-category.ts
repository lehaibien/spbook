import db from "@spbook/db";
import type { PaginationRequest } from "@/models/common";
import type { CategoryResponse } from "./category-models";

export async function getCategoryHandler(req: PaginationRequest) {
  const pageIndex = req.page - 1;
  const result: CategoryResponse[] = await db.category.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      name: {
        contains: req.search,
      },
    },
    skip: pageIndex * req.pageSize,
    take: req.pageSize,
  });
  const total = await db.category.count();
  const totalPages = Math.ceil(total / req.pageSize);
  return {
    data: result,
    totalCount: total,
    totalPages,
    hasPreviousPage: pageIndex > 0,
    hasNextPage: pageIndex < totalPages - 1,
  };
}
