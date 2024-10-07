import prisma from "../../prisma/prismaClient.js";
import { getUserByEmail } from "../users/users.controller.js";

export const createBook = async (book, email) => {
  const { title, year, publisher, authorId } = book;
  const user = await getUserByEmail(email);
  //Esto es igual a lo de arriba
  // const title = req.body.title;
  // const year = req.body.year;
  // const publisher = req.body.publisher;
  const create_book = await prisma.book.create({
    data: {
      title,
      year,
      publisher,
      authorId,
      userId: user.id,
    },
  });
  return create_book;
};

export const getBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

export const getBook = async (id) => {
  const get_book = await prisma.book.findUnique({
    where: { id },
    include: {
      author: { select: { firstName: true, lastName: true } },
      user: { select: { email: true } },
    },
  });
  return get_book;
};

export const updateBook = async (id, bookData) => {
  const { title } = bookData;
  const book = await prisma.book.update({
    where: { id },
    data: {
      ...(title && { title: title.toLowerCase() }),
    },
  });
  return book;
};

export const deleteBook = async (id) => {
  const book = await prisma.book.delete({
    where: { id },
  });
  return book;
};
