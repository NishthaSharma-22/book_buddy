import mongoose, { Schema, models } from "mongoose";

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      trim: true,
      default: "",
    },

    isbn: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    grade: {
      type: String,
      required: true,
    },

    edition: {
      type: String,
      trim: true,
      default: "",
    },

    condition: {
      type: String,
      enum: ["new", "like-new", "good", "fair", "well-used"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    exchangeType: {
      type: String,
      enum: ["donate", "swap", "sell", "lend"],
      required: true,
    },

    ownerId: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["available", "given-away", "sold", "lent", "archived"],
        default: "available",
    },
    givenTo: {
        type: String,
        default: "",
    },

    institutionId: {
      type: String,
      default: null,
    },

    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const Book = models.Book || mongoose.model("Book", BookSchema);
