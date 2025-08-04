import express from 'express';
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getAdminProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// =================================================================
// --- PUBLIC ROUTES ---
// =================================================================
router.route('/').get(getProducts);
router.get('/top', getTopProducts);
router.route('/:id').get(getProduct);
router.post('/:id/reviews', protect, createProductReview);

// =================================================================
// --- ADMIN ROUTES ---
// =================================================================

router.route('/').post(protect, admin, createProduct);

router.route('/admin/all').get(protect, admin, getAdminProducts);

router
  .route('/:id')
  .put(protect, admin, updateProduct)      // Update a product
  .delete(protect, admin, deleteProduct);  // Delete a product

export default router;
