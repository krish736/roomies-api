import express from "express";
import {
  updateUser,
  signOut,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update/:userId", updateUser);
router.post("/signout", signOut);
router.delete("/delete/:userId", deleteUser);

export default router;
