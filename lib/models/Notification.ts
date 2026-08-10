import mongoose, { Schema, models } from "mongoose";

const NotificationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["book_request", "message"],
      required: true,
    },

    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    senderId: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Notification =
  models.Notification || mongoose.model("Notification", NotificationSchema);
