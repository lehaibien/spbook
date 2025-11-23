import db from "@spbook/db";
import type { PaginationRequest } from "@/models/common";
import type { PublisherResponse } from "./publisher-models";

export async function getPublisherHandler(req: PaginationRequest) {
  const pageIndex = req.page - 1;
  const result: PublisherResponse[] = await db.publisher.findMany({
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
  const total = await db.publisher.count();
  const totalPages = Math.ceil(total / req.pageSize);
  return {
    data: result,
    totalCount: total,
    totalPages,
    hasPreviousPage: pageIndex > 0,
    hasNextPage: pageIndex < totalPages - 1,
  };
}
