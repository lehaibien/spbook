import db from "@spbook/db";
import type { PaginationRequest } from "@/models/common";
import type { UserResponse } from "./user-models";

export async function getUserHandler(req: PaginationRequest) {
  const pageIndex = req.page - 1;
  const result = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      roles: {
        select: {
          displayName: true,
        },
      },
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
  const data: UserResponse[] = result.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    emailVerified: item.emailVerified,
    image: item.image,
    roles: item.roles.map((role) => role.displayName),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
  const total = await db.user.count();
  const totalPages = Math.ceil(total / req.pageSize);
  return {
    data,
    totalCount: total,
    totalPages,
    hasPreviousPage: pageIndex > 0,
    hasNextPage: pageIndex < totalPages - 1,
  };
}
