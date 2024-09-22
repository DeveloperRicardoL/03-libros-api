import prisma from "../../prisma/prismaClient.js";

export const createAuthor = async (author) => {
  const { firstName, lastName, nationality, birthdate } = author;
  const dateAut = new Date(birthdate);
  const create_author = await prisma.author.create({
    data: {
      firstName,
      lastName,
      nationality,
      birthdate: dateAut,
    },
  });
  return create_author;
};

export const getAuthors = async () => {
  const authors = await prisma.author.findMany();
  return authors;
};

export const getAuthor = async (id) => {
  const author = await prisma.author.findUniqueOrThrow({
    where: { id },
  });
  return author;
};

export const updateAuthor = async (id, authorData) => {
  const { firstName, lastName, nationality, birthdate } = authorData;
  const dateAuthor = new Date(birthdate);
  const author = await prisma.author.update({
    where: { id },
    data: {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(nationality && { nationality }),
      ...(birthdate && { birthdate: dateAuthor }),
    },
  });
  return author;
};

export const deleteAuthor = async (id) => {
  const aut = await prisma.author.delete({
    where: { id },
  });
  return aut;
};
