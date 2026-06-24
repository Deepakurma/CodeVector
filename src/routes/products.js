import express from "express";
import { addProducts, getProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.post("/add", addProducts);
router.get("/all", getProducts);

export default router;
