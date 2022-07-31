import Product from "./models/Product.js";

const resolvers = {
  Query: {
    allProducts: async () => {
      return await Product.find({});
    },
  },
  Mutation: {
    EditProduct: async (root, args) => {
      await Product.findByIdAndUpdate(args._id, args);
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

export default resolvers