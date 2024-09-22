import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

export const createUser = async (user) => {
  const { firstName, lastName, email, password } = user;
  const passwordBcrypt = await bcrypt.hash(password, 10);
  const create_user = await prisma.users.create({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
    data: {
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email.toLowerCase(),
      password: passwordBcrypt,
    },
  });
  return create_user;
};

export const getUsers = async () => {
  // const { id, firstName, lastName, email } = body;       <-- ¿Esto no se usa?
  const users = await prisma.users.findMany({
    select: { id: true, firstName: true, lastName: true, email: true },
    where: { deletedAt: null },
  });
  return users;
};

export const getUser = async (id) => {
  const user = await prisma.users.findUnique({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
    where: { id, deletedAt: null },
  });
  return user;
};

export const updateUser = async (id, userData) => {
  const { firstName, lastName, password } = userData;
  const user = await prisma.users.update({
    select: { firstName: true, lastName: true },
    where: { id, deletedAt: null },
    data: {
      ...(firstName && { firstName: firstName.toLowerCase() }),
      ...(lastName && { lastName: lastName.toLowerCase() }),
      ...(password && { password }),
    },
  });
  return user;
};

export const deleteUser = async (id) => {
  const user = await prisma.users.update({
    where: { id, deletedAt: null },
    data: {
      deletedAt: new Date(),
    },
  });
  return user;
};
