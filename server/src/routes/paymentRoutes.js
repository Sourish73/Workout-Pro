import express from 'express';
import {
  createOrder,
  verifyPayment,
  checkAccess,
  handleWebhook,
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/webhook', handleWebhook);
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.post('/check-access', checkAccess);

export default router;
