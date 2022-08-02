import { ApolloServer } from "apollo-server-express";
import "./db.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("SBS Challenge API"));

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();

server.applyMiddleware({ app });

let httpServer = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}\n\n`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  socket.emit(
    "reload",
    "query { allProducts { _id, name, price, description, image_url } }"
  );
  socket.on("getall", () => {
    io.emit(
      "reload",
      "query { allProducts { _id, name, price, description, image_url } }"
    );
  });
});
