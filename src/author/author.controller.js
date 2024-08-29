import prisma from "../../prisma/prismaClient.js";

export const getAutors = async (req, res) => {
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
