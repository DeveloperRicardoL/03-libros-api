import prisma from "../../prisma/prismaClient.js";

export const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ Error: "Error al obtener los autores" });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const { firstName, lastName, nationality, birthdate } = req.body;
    const dateAu = new Date(birthdate);

    const author = await prisma.author.create({
      data: {
        firstName,
        lastName,
        nationality,
        birthdate: dateAu,
      },
    });
    res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al crear el autor");
  }
};

export const getAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ msg: "Id no valido, debe ingresar un número valido" });
    }
    const author = await prisma.author.findUniqueOrThrow({
      where: { id },
    });
    res.status(200).json(author);
  } catch (error) {
    res.status(404).json({ msg: "No se ha encontrado el autor" });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) res.status(400).json({ msg: "Id no valido" });
    const { firstName, lastName, nationality } = req.body;
    const author = await prisma.author.update({
      where: { id },
      data: { firstName, lastName, nationality },
    });
    if (!author) throw new Error("No se pudo actualizar el autor");
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al actualizar el autor");
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) res.status(400).json({ msg: "Id no valido" });
    const aut = await prisma.author.delete({
      where: { id },
    });
    res.status(200).json("Autor eliminado correctamente");
  } catch (error) {
    res.status(500).json("Error al eliminar el autor");
  }
};
