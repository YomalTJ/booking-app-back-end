import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import roomRoutes from "./routes/room.routes";

dotenv.config();

const app: express.Application = express();

app.use(express.json());

const allowedOrigins = [
  "https://booking-app-front-end-omega.vercel.app",
  "https://booking-app-front-end-gamma.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running");
});

export default app;
