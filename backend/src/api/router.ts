import express from "express";
import ordersRouter from "@/api/orders/router.js";
import paymentRouter from "@/api/payment/router.js";
import listingRouter from "@/api/listing/router.js";
import auctionRouter from "@/api/auction/router.js";
import categoryRouter from "@/api/category/router.js";
import reviewRouter from "@/api/review/router.js";

const router = express.Router();

router.use('/orders', ordersRouter)
router.use('/payment', paymentRouter)
router.use('/products', listingRouter);
router.use('/auction', auctionRouter);
router.use('/category', categoryRouter);
router.use('/review', reviewRouter);

export default router;