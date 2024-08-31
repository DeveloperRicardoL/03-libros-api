import express from "express";
import { createAuthor, getAuthor, getAuthors } from "./author.controller.js";

const router = express.Router();

router.get("/author", getAuthors);
router.post("/author", createAuthor);
router.get("/author/:id", getAuthor);

export default router;
