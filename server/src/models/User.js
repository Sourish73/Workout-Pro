import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    hasPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
    paymentId: {
      type: String,
      default: '',
    },
    subscriptionStatus: {
      type: String,
      enum: ['free', 'active', 'expired'],
      default: 'free',
    },
    subscriptionEndDate: {
      type: Date,
      default: null,
    },
    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  // If email is Akshita's official email, automatically grant admin
  const adminEmails = [
    'fitwithakshita@gmail.com',
    'akshitaoffside@gmail.com',
    'akshitasahu@gmail.com',
    'kashish18bhatt@gmail.com',
  ];
  if (adminEmails.includes(this.email?.toLowerCase())) {
    this.role = 'admin';
    this.hasPaid = true; // Admin has permanent full access
  }

  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user has active paid access
userSchema.methods.isPaidUser = function () {
  if (this.role === 'admin') return true;
  return this.hasPaid === true;
};

export const User = mongoose.model('User', userSchema);
