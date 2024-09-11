import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./users.controller.js";

const router = express.Router();

router.post("/user", createUser);
router.get("/user", getUsers);
router.get("/user/:email", getUser);
router.patch("/user/:email", updateUser);
router.delete("/user/:email", deleteUser);

export default router;
