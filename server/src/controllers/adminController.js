import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';

// @desc    Get Admin Stats (Total buyers, total revenue, recent purchases)
// @route   GET /api/admin/stats
// @access  Private (Akshita Sahu / Admin Only)
export const getAdminStats = async (req, res) => {
  try {
    const adminEmails = [
      'fitwithakshita@gmail.com',
      'akshitaoffside@gmail.com',
      'akshitasahu@gmail.com',
      'kashish18bhatt@gmail.com',
    ];
    const isAuthorizedAdmin =
      adminEmails.includes(req.user.email?.toLowerCase()) || req.user.role === 'admin';

    if (!isAuthorizedAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: Admin dashboard is restricted to Akshita Sahu.',
      });
    }

    // Query all captured payments
    const payments = await Payment.find({ status: 'captured' }).sort({ createdAt: -1 });

    const totalBuyers = payments.length;
    const totalRevenuePaise = payments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const totalRevenueINR = Math.round(totalRevenuePaise / 100);

    // Also count registered users who have paid
    const paidUsersCount = await User.countDocuments({ hasPaid: true });

    return res.json({
      success: true,
      stats: {
        totalBuyers,
        paidUsersCount,
        totalRevenueINR,
        currency: 'INR',
        adminEmail: req.user.email,
      },
      orders: payments.map((p) => ({
        id: p._id,
        buyerName: p.buyerName || 'Athlete',
        buyerEmail: p.buyerEmail,
        buyerPhone: p.buyerPhone || 'N/A',
        amountINR: (p.amount || 0) / 100,
        paymentId: p.razorpayPaymentId || p.razorpayOrderId,
        orderId: p.razorpayOrderId,
        status: p.status,
        date: p.createdAt,
      })),
    });
  } catch (error) {
    console.error('[Admin Stats Error]', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve admin stats.' });
  }
};
