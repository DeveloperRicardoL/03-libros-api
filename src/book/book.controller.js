import prisma from "../../prisma/prismaClient.js";

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, year, publisher } = req.body;

    //Esto es igual a lo de arriba
    // const title = req.body.title;
    // const year = req.body.year;
    // const publisher = req.body.publisher;

    const book = await prisma.book.create({
      data: {
        title,
        year,
        publisher,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json("Error al crear un libro");
  }
};

export const getBook = async (req, res) => {
  try {
    const ident = parseInt(req.params.id);
    const book = await prisma.book.findUnique({
      where: {
        id: ident,
      },
    });
    if (!book) throw new Error("No se encontro el libro");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar el libro" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title } = req.body;
    const book = await prisma.book.update({
      where: { id },
      data: { title },
    });
    if (!book) throw new Error("No se pudo actualizar el libro");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await prisma.book.delete({
      where: { id },
    });
    if (!book) throw new Error("No se pudo eliminar el libro");
    res.status(200).json({ msg: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
