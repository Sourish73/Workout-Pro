import crypto from 'crypto';
import Razorpay from 'razorpay';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_secret_placeholder';
  return new Razorpay({ key_id, key_secret });
};

const isPlaceholderKey = () => {
  const key = process.env.RAZORPAY_KEY_ID || '';
  return !key || key.includes('placeholder') || key === 'rzp_test_placeholder';
};

// @desc    Create Razorpay Order for ₹99 Build With Me Guide
// @route   POST /api/payment/create-order
// @access  Public (Guest or Auth)
export const createOrder = async (req, res) => {
  try {
    const { email, phone, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required to generate order.',
      });
    }

    const priceINR = 99; // ₹99 as shown in Akshita's checkout
    const amountInPaise = priceINR * 100;
    const cleanEmail = email.toLowerCase().trim();

    // Check if user is logged in
    const userId = req.user ? req.user._id : null;

    if (isPlaceholderKey()) {
      const mockOrderId = `order_test_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

      await Payment.create({
        userId,
        buyerName: name || 'Athlete',
        buyerEmail: cleanEmail,
        buyerPhone: phone || '',
        razorpayOrderId: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        status: 'created',
        plan: 'BUILD_WITH_ME_GYM_SPLIT',
      });

      return res.json({
        success: true,
        orderId: mockOrderId,
        amount: amountInPaise,
        currency: 'INR',
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        isMockMode: true,
        brandName: 'BUILD WITH ME - AKSHITA',
      });
    }

    // Live Razorpay order
    const razorpay = getRazorpayInstance();
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${cleanEmail.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)}_${Date.now().toString().slice(-6)}`,
      notes: {
        buyerEmail: cleanEmail,
        buyerPhone: phone || '',
        plan: 'BUILD_WITH_ME_GYM_SPLIT',
      },
    };

    const order = await razorpay.orders.create(options);

    await Payment.create({
      userId,
      buyerName: name || 'Athlete',
      buyerEmail: cleanEmail,
      buyerPhone: phone || '',
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: 'created',
      plan: 'BUILD_WITH_ME_GYM_SPLIT',
    });

    return res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      isMockMode: false,
      brandName: 'BUILD WITH ME - AKSHITA',
    });
  } catch (error) {
    console.error('[Create Order Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create payment order.',
    });
  }
};

// @desc    Verify Razorpay Payment & Unlock Access
// @route   POST /api/payment/verify
// @access  Public
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      buyerEmail,
      buyerPhone,
      buyerName,
      is_mock_success,
    } = req.body;

    if (!razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: 'Order ID is required.',
      });
    }

    let isValidSignature = false;

    if (isPlaceholderKey() && (is_mock_success || razorpay_order_id.startsWith('order_test_'))) {
      isValidSignature = true;
    } else {
      const secret = process.env.RAZORPAY_KEY_SECRET || '';
      const hmac = crypto.createHmac('sha256', secret);
      hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
      const expectedSignature = hmac.digest('hex');

      try {
        const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
        const signatureBuffer = Buffer.from(razorpay_signature || '', 'utf8');
        if (expectedBuffer.length === signatureBuffer.length) {
          isValidSignature = crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
        }
      } catch (err) {
        console.error('[Signature Error]', err);
        isValidSignature = false;
      }
    }

    if (!isValidSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Verification failed.',
      });
    }

    const cleanEmail = buyerEmail ? buyerEmail.toLowerCase().trim() : '';
    const paymentId = razorpay_payment_id || `pay_${Date.now()}`;

    // Update payment record in database
    let payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (payment) {
      payment.razorpayPaymentId = paymentId;
      payment.razorpaySignature = razorpay_signature || 'verified';
      payment.status = 'captured';
      if (cleanEmail) payment.buyerEmail = cleanEmail;
      if (buyerPhone) payment.buyerPhone = buyerPhone;
      if (buyerName) payment.buyerName = buyerName;
      await payment.save();
    } else {
      payment = await Payment.create({
        buyerName: buyerName || 'Athlete',
        buyerEmail: cleanEmail || 'athlete@winterarc.com',
        buyerPhone: buyerPhone || '',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: paymentId,
        razorpaySignature: razorpay_signature || 'verified',
        amount: 4900,
        currency: 'INR',
        status: 'captured',
        plan: 'WINTER_ARC_COMPLETE_GUIDE',
      });
    }

    // If an account exists with this email, mark as paid
    if (cleanEmail) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        user.hasPaid = true;
        user.paidAt = new Date();
        user.paymentId = paymentId;
        await user.save();
      }
    }

    return res.json({
      success: true,
      message: 'Payment verified successfully! Winter Arc 7-Day Protocol & Resources are now unlocked.',
      hasPaid: true,
      buyerEmail: cleanEmail,
      paymentId,
    });
  } catch (error) {
    console.error('[Verify Payment Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error occurred while verifying payment.',
    });
  }
};

// @desc    Check if an email has already paid
// @route   POST /api/payment/check-access
// @access  Public
export const checkAccess = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, hasPaid: false });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Akshita is always unlocked
    const adminEmails = [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ];
    if (adminEmails.includes(cleanEmail)) {
      return res.json({ success: true, hasPaid: true, isAdmin: true });
    }

    const payment = await Payment.findOne({
      buyerEmail: cleanEmail,
      status: 'captured',
    });

    if (payment) {
      return res.json({ success: true, hasPaid: true, paymentId: payment.razorpayPaymentId });
    }

    const user = await User.findOne({ email: cleanEmail, hasPaid: true });
    if (user) {
      return res.json({ success: true, hasPaid: true, paymentId: user.paymentId });
    }

    return res.json({ success: true, hasPaid: false });
  } catch (error) {
    return res.status(500).json({ success: false, hasPaid: false });
  }
};

// @desc    Razorpay Webhook Handler
// @route   POST /api/payment/webhook
// @access  Public
export const handleWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (!webhookSecret) return res.status(200).json({ status: 'ignored_no_secret' });

    const rawBody = req.body;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const payload = JSON.parse(rawBody.toString('utf8'));
    if (payload.event === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      const orderId = paymentEntity.order_id;
      const paymentId = paymentEntity.id;
      const email = paymentEntity.email || paymentEntity.notes?.buyerEmail;

      let record = await Payment.findOne({ razorpayOrderId: orderId });
      if (record) {
        record.razorpayPaymentId = paymentId;
        record.status = 'captured';
        await record.save();
      }

      if (email) {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
          user.hasPaid = true;
          user.paymentId = paymentId;
          await user.save();
        }
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    return res.status(500).json({ error: 'Webhook processing error' });
  }
};
