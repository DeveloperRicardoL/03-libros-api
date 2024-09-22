import express from "express";
import {
  createBookController,
  deleteBookController,
  getBookController,
  getBooksController,
  updateBookController,
} from "./book.controller.js";

const router = express.Router();

router.get("/book", getBooksController);
router.post("/book", createBookController);
router.get("/book/:id", getBookController);
router.patch("/book/:id", updateBookController);
router.delete("/book/:id", deleteBookController);

export default router;
