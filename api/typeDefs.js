import { gql } from "apollo-server";

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

export default typeDefs;
