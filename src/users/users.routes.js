import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./users.controller.js";

const router = express.Router();

router.post("/user", createUserController);
router.get("/user", getUsersController);
router.get("/user/:id", getUserController);
router.patch("/user/:id", updateUserController);
router.delete("/user/:id", deleteUserController);

export default router;
