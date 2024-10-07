import prisma from "../../prisma/prismaClient.js";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./users.service.js";

export const createUserController = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crear el usuario" });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al obtener los usuarios registrados" });
  }
};

export const getUserController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    /* const { firstName, lastName, email, createdAt, updatedAt, deletedAt } =
      req.body;    <--Esto tampoco se usa?    */
    const user = await getUser(id);
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

export const updateUserController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!exitsUser(id)) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al actualizar el usuario" });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteUserBoolean = await exitsUser(id);
    if (!deleteUserBoolean)
      return res.status(404).json({ msg: "Usuario no encontrado o no existe" });
    const user = await deleteUser(id);
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

export const getUserByEmail = async (email) => {
  const user = await prisma.users.findUniqueOrThrow({ where: { email } });
  return user;
};
