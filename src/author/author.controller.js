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
