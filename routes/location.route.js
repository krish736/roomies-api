import express from "express";
import { getBestPlaces } from "../controllers/location.controller.js";

const router = express.Router();

router.post("/locations", getBestPlaces);

export default router;
