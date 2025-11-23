import db from "@spbook/db";
import type { PaginationRequest } from "@/models/common";
import type { BookResponse } from "./book-models";

export async function getBooksHandler(req: PaginationRequest) {
  const pageIndex = req.page - 1;
  const result = await db.book.findMany({
    select: {
      id: true,
      isbn: true,
      slug: true,
      title: true,
      description: true,
      language: true,
      authors: {
        select: {
          author: {
            select: {
              name: true,
            },
          },
        },
      },
      publisher: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      images: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      title: {
        contains: req.search,
      },
    },
    skip: pageIndex * req.pageSize,
    take: req.pageSize,
  });
  const data: BookResponse[] = result.map((item) => ({
    id: item.id,
    isbn: item.isbn,
    slug: item.slug,
    title: item.title,
    description: item.description,
    language: item.language,
    authors: item.authors.map((author) => author.author.name),
    publisher: item.publisher.name,
    categories: item.categories.map((category) => category.category.name),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    images: item.images,
  }));
  const total = await db.book.count();
  const totalPages = Math.ceil(total / req.pageSize);
  return {
    data,
    totalCount: total,
    totalPages,
    hasPreviousPage: pageIndex > 0,
    hasNextPage: pageIndex < totalPages - 1,
  };
}
