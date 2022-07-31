import { ApolloServer } from "apollo-server-express";
import "./db.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import express, { json, urlencoded } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/",(req,res)=>res.send("SBS Challenge API"))

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  app.listen(3000, () => {
    console.log(`Server ready`, 3000);
  });
}
start();

export default app;
