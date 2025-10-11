import express from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/controllers/listing/listing-controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;
