import mongoose, { Schema, models } from "mongoose";

const ConversationSchema = new Schema(
  {
    participants: {
      type: [String],
      required: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    lastMessageSenderId: {
      type: String,
      default: "",
    },

    lastMessageAt: {
      type: Date,
      default: null,
    },

    readBy: {
      type: [String],
      default: [],
    },
    requestStatus: {
      type: String,
      enum: ["pending", "acepted", "rejected"],
      default: "pending",
    }
  },
  {
    timestamps: true,
  },
);

ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ updatedAt: -1 });

export const Conversation =
  models.Conversation || mongoose.model("Conversation", ConversationSchema);
