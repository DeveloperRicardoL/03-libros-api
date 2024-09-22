import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "./author.service.js";

export const getAuthorsController = async (req, res) => {
  try {
    const authors = await getAuthors();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ Error: "Error al obtener los autores" });
  }
};

export const createAuthorController = async (req, res) => {
  try {
    const author = await createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al crear el autor");
  }
};

export const getAuthorController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res
        .status(400)
        .json({ msg: "Id no valido, debe ingresar un número valido" });
    }
    const author = await getAuthor(id);
    res.status(200).json(author);
  } catch (error) {
    res.status(404).json({ msg: "No se ha encontrado el autor" });
  }
};

export const updateAuthorController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) res.status(400).json({ msg: "Id no valido" });
    const author = await updateAuthor(id, req.body);
    if (!author) throw new Error("No se pudo actualizar el autor");
    res.status(200).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error al actualizar el autor");
  }
};

export const deleteAuthorController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) res.status(400).json({ msg: "Id no valido" });
    const author = await deleteAuthor(id);
    res.status(200).json("Autor eliminado correctamente");
  } catch (error) {
    res.status(500).json("Error al eliminar el autor");
  }
};
