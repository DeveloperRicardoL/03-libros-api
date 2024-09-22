import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "./book.service.js";

export const getBooksController = async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener libros" });
  }
};

export const createBookController = async (req, res) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json("Error al crear un libro");
  }
};

export const getBookController = async (req, res) => {
  try {
    const ident = parseInt(req.params.id);
    const book = await getBook(ident);
    if (!book) throw new Error("No se encontro el libro");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al encontrar el libro" });
  }
};

export const updateBookController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await updateBook(id, req.body);
    if (!book) throw new Error("No se pudo actualizar el libro");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = await deleteBook(id);
    if (!book) throw new Error("No se pudo eliminar el libro");
    res.status(200).json({ msg: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
