import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'ironpulse_super_secret_jwt_key_2026_prod',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email, and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists. Please sign in.',
      });
    }

    // Check if this email has previously purchased
    const priorPayment = await Payment.findOne({
      buyerEmail: cleanEmail,
      status: 'captured',
    });

    const adminEmails = [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ];
    const isAkshitaAdmin = adminEmails.includes(cleanEmail);

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password,
      role: isAkshitaAdmin ? 'admin' : 'user',
      hasPaid: isAkshitaAdmin || Boolean(priorPayment),
      paidAt: priorPayment ? priorPayment.createdAt : isAkshitaAdmin ? new Date() : null,
      paymentId: priorPayment ? priorPayment.razorpayPaymentId : '',
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        hasPaid: user.hasPaid,
        isAdmin: user.role === 'admin',
      },
      token,
    });
  } catch (error) {
    console.error('[Register Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Auto-sync admin role for Akshita
    const adminEmails = [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ];
    if (adminEmails.includes(cleanEmail)) {
      user.role = 'admin';
      user.hasPaid = true;
      await user.save();
    } else if (!user.hasPaid) {
      // Check if user paid as a guest before logging in
      const priorPayment = await Payment.findOne({
        buyerEmail: cleanEmail,
        status: 'captured',
      });
      if (priorPayment) {
        user.hasPaid = true;
        user.paidAt = priorPayment.createdAt;
        user.paymentId = priorPayment.razorpayPaymentId;
        await user.save();
      }
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        hasPaid: user.hasPaid,
        isAdmin: user.role === 'admin',
      },
      token,
    });
  } catch (error) {
    console.error('[Login Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Auto-sync admin for Akshita
    const adminEmails = [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ];
    if (adminEmails.includes(user.email?.toLowerCase())) {
      user.role = 'admin';
      user.hasPaid = true;
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        hasPaid: user.hasPaid,
        isAdmin: user.role === 'admin',
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('[GetMe Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};
