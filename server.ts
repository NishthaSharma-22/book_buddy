import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const { connectDB } = await import("./lib/mongodb");
  const { Message } = await import("./lib/models/Message");

  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);

    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  (globalThis as any).io = io;

  io.on("connection", (socket) => {
    socket.on("join-conversation", (conversationId) => {
      socket.join(`conversation:${conversationId}`);
    });

    socket.on("join-user", (userId) => {
      socket.join(`user:${userId}`);
    });
    socket.on("send-message", async (message) => {
      try {
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

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
