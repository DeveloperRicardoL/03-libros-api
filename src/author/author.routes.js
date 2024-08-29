import express from "express";
import { createAuthor, getAutors } from "./author.controller.js";

const router = express.Router();

router.get("/author", getAutors);
router.post("/author", createAuthor);

export default router;
