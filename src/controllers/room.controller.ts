import { Request, Response } from "express";
import { Room } from "../models/room.model";
import { Booking } from "../models/booking.model";

export const getAvailableRooms = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const availableRooms = await Room.find({ availability: true });

    res.status(200).json({
      success: true,
      count: availableRooms.length,
      data: availableRooms,
    });
  } catch (error) {
    console.error("Error fetching available rooms:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching available rooms",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getRooms = async (req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await Room.find();

    const bookings = await Booking.find();

    const roomsWithAvailability = await Promise.all(
      rooms.map(async (room) => {
        const roomBookings = bookings.filter(
          (booking) =>
            booking.roomId.toString() === (room._id as string).toString()
        );

        const roomObj = room.toObject();

        if (roomBookings.length > 0) {
          return {
            ...roomObj,
            bookings: roomBookings.map((booking) => ({
              startDate: booking.startDate,
              endDate: booking.endDate,
            })),
          };
        }

        return roomObj;
      })
    );

    res.status(200).json({
      success: true,
      count: roomsWithAvailability.length,
      data: roomsWithAvailability,
    });
    return;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
