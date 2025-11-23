import db from "@spbook/db";

import type { BookRequest } from "./book-models";

export async function createBookHandler(req: BookRequest) {
  const slug = req.title.toLowerCase().replace(/\s+/g, "-");
  const fakeImages = [
    "https://avatars.githubusercontent.com/u/124599?v=4",
    "https://avatars.githubusercontent.com/u/37410110?v=4",
  ];
  const authors = req.authors.split(",");
  const categories = req.categories.split(",");
  const result = await db.book.create({
    data: {
      slug,
      isbn: req.isbn,
      title: req.title,
      description: req.description,
      language: req.language,
      publisherId: req.publisherId,
      images: fakeImages,
      authors: {
        create: authors.map((author) => ({
          authorId: author,
        })),
      },
      categories: {
        create: categories.map((category) => ({
          categoryId: category,
        })),
      },
    },
    select: {
      id: true,
    },
  });
  return result;
}
