import mongoose, { Schema, Document } from "mongoose";

export interface IRoom extends Document {
  name: string;
  description: string;
  capacity: number;
  image: string;
  availability: boolean;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number, required: true },
  image: { type: String },
  availability: { type: Boolean, default: true },
});

export const Room = mongoose.model<IRoom>("Room", roomSchema);
