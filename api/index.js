import { gql } from "apollo-server";
import { ApolloServer } from "apollo-server";
import "./db.js";
import Product from "./models/Product.js";

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    price: Float!
    description: String!
    image_url: String!
  }

  type Query {
    allProducts: [Product]!
  }

  type Mutation {
    EditProduct(
      _id: ID!
      name: String
      price: Float
      description: String
      image_url: String
    ): Product!

    CreateProduct(
      name: String!
      price: Float!
      description: String!
      image_url: String!
    ): Product!

    DeleteProduct(_id: ID!): String!
  }
`;

const resolvers = {
  Query: {
    allProducts: async () => {
      return await Product.find({});
    },
  },
  Mutation: {
    EditProduct: async (root, args) => {
      await Product.findByIdAndUpdate(args._id,args);
      const modifiedProduct = await Product.findById(args._id);
      return modifiedProduct;
    },
    CreateProduct: async (root, args) => {
      const newProduct = new Product(args);
      await newProduct.save();
      return newProduct;
    },
    DeleteProduct: async (root, args) => {
      const { _id } = args;
      await Product.findByIdAndDelete(_id);
      return "Producto eliminado";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
