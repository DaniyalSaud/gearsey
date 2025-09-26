import express from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  confirmOrder,
  cancelOrder,
  deleteOrder,
} from "@/controllers/orders-controller/order-controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.get("/", getOrderById);
router.put("/", confirmOrder);
router.put("/", cancelOrder);
router.delete("/", deleteOrder);

export default router;
