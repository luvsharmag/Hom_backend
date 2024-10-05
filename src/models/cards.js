import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String},
  link: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Card = mongoose.model('Card', cardSchema);