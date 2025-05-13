import express from "express";
import {
  createBooking,
  deleteBooking,
  updateBooking,
  getUserBookings,
} from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.delete("/:id", authenticate, deleteBooking);
router.put("/:id", authenticate, updateBooking);
router.get("/", authenticate, getUserBookings);

export default router;
