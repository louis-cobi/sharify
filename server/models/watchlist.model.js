import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.option.js";

const watchListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    medias: [
      {
        mediaId: { type: Number, required: true },
        title: { type: String, required: true },
        posterPath: { type: String },
        releaseDate: { type: String },
        voteAverage: { type: Number },
        overview: { type: String },
      },
    ],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  modelOptions
);

const watchlistModel = mongoose.model("WatchList", watchListSchema, "watchlists");

export default watchlistModel;
