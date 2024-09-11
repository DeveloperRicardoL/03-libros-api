import prisma from "../../prisma/prismaClient.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await prisma.users.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al crear el usuario");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al obtener los usuarios registrados");
  }
};

export const getUser = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "No se encontro al usuario ingresado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al buscar el usuario");
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const exitsUser = await prisma.users.findUnique({
      where: { email },
    });

    if (!exitsUser) {
      return res.status(404).json({ msg: "Email no encontrado" });
    }

    const { firstName, lastName, password } = req.body;
    const user = await prisma.users.update({
      where: { email },
      data: {
        ...(firstName && { firstName: firstName.toLowerCase() }),
        ...(lastName && { lastName: lastName.toLowerCase() }),
        ...(password && { password }),
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al actualizar el usuario");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.params.email.toLowerCase();
    const exitsUser = await prisma.users.findUnique({
      where: { email },
    });
    if (!exitsUser) {
      return res.status(404).json({ msg: "Email no encontrado" });
    }
    const user = await prisma.users.delete({
      where: { email },
    });
    res.status(200).json("Usuario eliminado con éxito");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al eliminar el usuario");
  }
};
