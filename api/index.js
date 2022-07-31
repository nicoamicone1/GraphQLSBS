import { ApolloServer } from "apollo-server-express";
import "./db.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/",(req,res)=>res.send("SBS Challenge API"))

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`Server ready`, process.env.PORT);
  });
}
start();

export default app;
