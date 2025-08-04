import Product from '../models/productModel.js';
import { deleteFile } from '../utils/file.js';

// @desc     Create a sample product
// @method   POST
// @endpoint /api/v1/products
// @access   Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      user: req.user._id,
      name: 'Sample Name',
      image: '/images/sample.jpg',
      description: 'Sample Description',
      brand: 'Sample Brand',
      category: 'Sample Category',
      price: 0,
      countInStock: 0,
      numReviews: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};



const getProducts = async (req, res, next) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;
    const { search, category } = req.query;
    const filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = { $regex: `^${category}$`, $options: 'i' };
    }
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { name, image, description, brand, category, price, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }
    const previousImage = product.image;
    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    if (previousImage && previousImage !== updatedProduct.image) {
      deleteFile(previousImage);
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }
    await Product.deleteOne({ _id: product._id });
    deleteFile(product.image);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
};

const createProductReview = async (req, res, next) => {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.statusCode = 404;
      throw new Error('Product not found!');
    }
    const alreadyReviewed = product.reviews.find(
      (review) => review.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.statusCode = 400;
      throw new Error('Product already reviewed');
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    next(error);
  }
};

const getTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts, 
  getAdminProducts
};
