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
      const {name,price,description,image_url}=args
      const newProduct = new Product({name,price,description,image_url});
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