import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";

const port = Number(process.env.PORT) || 3001;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://book-buddy-mu.vercel.app"],
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("join-conversation", (conversationId) => {
    socket.join(`conversation:${conversationId}`);
  });

  socket.on("join-user", (userId) => {
    socket.join(`user:${userId}`);
  });

socket.on("send-message", async (message) => {
    try {
      const { connectDB } = await import("./lib/mongodb");
      const { Message } = await import("./lib/models/Message");

      await connectDB();

      const savedMessage = await Message.create({
        conversationId: message.conversationId,
        senderId: message.senderId,
        text: message.text,
      });

      io.to(`conversation:${message.conversationId}`).emit("new-message", {
        _id: savedMessage._id.toString(),
        conversationId: savedMessage.conversationId.toString(),
        senderId: savedMessage.senderId,
        text: savedMessage.text,
        createdAt: savedMessage.createdAt,
      });
    } catch (error) {
      console.error("Error saving message:", error);

      socket.emit("message-error", {
        error: "Failed to send message",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Socket.IO server running on port ${port}`);
});
