import prisma from "../../prisma/prismaClient.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordBcrypt = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
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
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { id, firstName, lastName, email } = req.body;
    const users = await prisma.users.findMany({
      select: { id: true, firstName: true, lastName: true, email: true },
      where: { deletedAt: null },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener los usuarios registrados" });
  }
};

export const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, createdAt, updatedAt, deletedAt } =
      req.body;
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
    if (!user) {
      return res
        .status(404)
        .json({ msg: "No se encontro al usuario ingresado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al buscar el usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (!exitsUser(id)) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const { firstName, lastName, password } = req.body;
    const user = await prisma.users.update({
      select: { firstName: true, lastName: true },
      where: { id, deletedAt: null },
      data: {
        ...(firstName && { firstName: firstName.toLowerCase() }),
        ...(lastName && { lastName: lastName.toLowerCase() }),
        ...(password && { password }),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteUser = await exitsUser(id);
    if (!deleteUser)
      return res.status(404).json({ msg: "Usuario no encontrado o no existe" });
    const user = await prisma.users.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
    res.status(200).json({ msg: "Usuario eliminado con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al eliminar el usuario" });
  }
};

export const exitsUser = async (id) => {
  try {
    const validUser = await prisma.users.findUnique({
      where: { id, deletedAt: null },
    });
    if (!validUser) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};
