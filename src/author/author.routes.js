import express from "express";
import {
  createAuthorController,
  deleteAuthorController,
  getAuthorController,
  getAuthorsController,
  updateAuthorController,
} from "./author.controller.js";

const router = express.Router();

router.get("/author", getAuthorsController);
router.post("/author", createAuthorController);
router.get("/author/:id", getAuthorController);
router.patch("/author/:id", updateAuthorController);
router.delete("/author/:id", deleteAuthorController);

export default router;
