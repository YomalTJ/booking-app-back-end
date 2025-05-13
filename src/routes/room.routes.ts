import express from "express";
import { getAvailableRooms, getRooms } from "../controllers/room.controller";

const router = express.Router();

router.get("/available", getAvailableRooms);

router.get("/", getRooms);

export default router;
