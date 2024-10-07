import express from "express";
import {
  createBookController,
  deleteBookController,
  getBookController,
  getBooksController,
  updateBookController,
} from "./book.controller.js";

import { isAuthenticated } from "../middlewares/auth-middlewares.js";

const router = express.Router();

router.get("/book", getBooksController);
router.post("/book", isAuthenticated, createBookController);
router.get("/book/:id", getBookController);
router.patch("/book/:id", isAuthenticated, updateBookController);
router.delete("/book/:id", isAuthenticated, deleteBookController);

export default router;
