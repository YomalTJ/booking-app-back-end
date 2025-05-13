import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const bookingSchema: Schema<IBooking> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
