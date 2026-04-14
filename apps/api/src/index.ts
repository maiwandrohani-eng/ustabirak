import cors from "@fastify/cors";
import Fastify from "fastify";
import { Server } from "socket.io";
import { registerRoutes } from "./routes.js";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

const io = new Server(app.server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join:worker", (workerId: string) => {
    socket.join(`worker:${workerId}`);
  });
  socket.on("join:customer", (customerId: string) => {
    socket.join(`customer:${customerId}`);
  });
  socket.on("join:admin", () => {
    socket.join("admins");
  });
});

registerRoutes(app, io);

const port = Number(process.env.API_PORT ?? 4000);
await app.listen({ port, host: "0.0.0.0" });
