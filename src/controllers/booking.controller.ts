import { Request, Response } from "express";
import { Booking } from "../models/booking.model";
import { Room } from "../models/room.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// Create Booking
export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { roomId, startDate, endDate } = req.body;
    const userId = req.userId;

    const room = await Room.findById(roomId);
    if (!room) {
      res.status(400).json({ message: "Room not available" });
      return;
    }

    const booking = await Booking.create({
      userId,
      roomId,
      startDate,
      endDate,
    });
    room.availability = false;
    await room.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Delete Booking
export const deleteBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "Unauthorized to delete this booking" });
      return;
    }

    const roomId = booking.roomId;
    await Booking.findByIdAndDelete(id);

    const otherBookings = await Booking.find({ roomId });
    if (otherBookings.length === 0) {
      await Room.findByIdAndUpdate(roomId, { availability: true });
    }

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

// Update Booking
export const updateBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "Unauthorized to update this booking" });
      return;
    }

    booking.startDate = startDate;
    booking.endDate = endDate;
    const updatedBooking = await booking.save();

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Error updating booking", error });
  }
};

// Get User Bookings
export const getUserBookings = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ userId }).populate("roomId");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
