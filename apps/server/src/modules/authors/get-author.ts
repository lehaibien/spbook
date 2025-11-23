import db from "@spbook/db";
import type { PaginationRequest } from "@/models/common";
import type { AuthorResponse } from "./author-models";

export async function getAuthorHandler(req: PaginationRequest) {
  const pageIndex = req.page - 1;
  const result = (await db.author.findMany({
    skip: pageIndex * req.pageSize,
    take: req.pageSize,
  })) as AuthorResponse[];
  const total = await db.author.count();
  const totalPages = Math.ceil(total / req.pageSize);
  return {
    data: result,
    totalCount: total,
    totalPages,
  };
}
