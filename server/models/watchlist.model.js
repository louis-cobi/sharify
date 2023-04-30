import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.option.js";

const watchListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    emoji: { type: String },
    description: { type: String },
    medias: [
      {
        mediaId: { type: Number },
        title: { type: String},
        posterPath: { type: String },
        releaseDate: { type: String },
        overview: { type: String },
      },
    ],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  modelOptions
);

const watchlistModel = mongoose.model("WatchList", watchListSchema, "watchlists");

export default watchlistModel;
