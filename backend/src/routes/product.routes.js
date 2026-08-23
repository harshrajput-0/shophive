import express from "express";
import { getProducts, getProductById, getProductsByVendor, getMyProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middelware.js";
import multer from "multer";


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Specific routes before '/:id' so they aren't swallowed by the param route.
router.get('/myproducts', protect, authorizeRole('vendor'), getMyProducts);
router.get('/vendor/:vendorId', getProductsByVendor);

router.route('/')
  .get(getProducts)
  .post(protect, authorizeRole('vendor'), upload.single('image'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorizeRole('vendor'), upload.single('image'), updateProduct)
  .delete(protect, authorizeRole('vendor', 'admin'), deleteProduct);

export default router;
