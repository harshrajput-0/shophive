import mongoose from "mongoose";
import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

// ====| GET PRODUCTS |-------------------------------------
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("vendor", "name avatar description");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| GET PRODUCT ID |-------------------------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "vendor",
      "name avatar description"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| GET PRODUCT BY VENDOR |------------------------------
// Public storefront: all items listed by one vendor, with the vendor's name attached.
export const getProductsByVendor = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.params.vendorId }).populate(
      "vendor",
      "name avatar description"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| GET MY PRODUCTS |------------------------------------
// Private convenience view for a logged-in vendor managing their own listings.
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| CREATE PRODUCT |-------------------------------------
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (req.user.isMock) {
      // Skip Cloudinary too — a mock account shouldn't burn real upload quota.
      return res.status(201).json({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        price,
        category,
        stock,
        imageUrl: req.file ? "(mock upload skipped)" : req.body.imageUrl || "",
        vendor: req.user._id,
        ratings: 0,
        numReviews: 0,
        isMock: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
      vendor: req.user._id,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

// ====| UPDATE PRODUCT |-------------------------------------
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own products" });
    }

    const { name, description, price, category, stock } = req.body;

    if (req.user.isMock) {
      return res.json({
        ...product.toObject(),
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category,
        stock: stock || product.stock,
        imageUrl: req.file ? "(mock upload skipped)" : product.imageUrl,
        isMock: true,
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined && !Number.isNaN(Number(price)) ? price : product.price;
    product.category = category || product.category;
    product.stock = stock !== undefined && !Number.isNaN(Number(stock)) ? stock : product.stock;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      product.imageUrl = result.secure_url;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

// ====| DELETE PRODUCT |-------------------------------------
// Vendors: own products only. Admin: any product, regardless of owner.
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.user.role === "vendor" && product.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    if (req.user.isMock) {
      return res.json({ message: "Product removed (mock account — not actually deleted)" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
