import express from "express";
import { getProducts, getProductById, getProductsByVendor, getMyProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controllers";
import protect from "../middlewares/auth.middleware";
import authorizeRole from "../middlewares/role.middelware";
import multer from "multer";


const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Specific routes before '/:id' so they aren't swallowed by the param route.
router.get('/myproducts', protect, authorize('vendor'), getMyProducts);
router.get('/vendor/:vendorId', getProductsByVendor);

router.route('/')
  .get(getProducts)
  .post(protect, authorize('vendor'), upload.single('image'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, authorize('vendor'), upload.single('image'), updateProduct)
  .delete(protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
