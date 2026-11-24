export const requirePro = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required to access Pro workouts.',
      isProRequired: true,
      requiresAuth: true,
    });
  }

  const isPro =
    req.user.subscriptionStatus === 'active' &&
    req.user.subscriptionEndDate &&
    new Date(req.user.subscriptionEndDate) > new Date();

  if (!isPro) {
    return res.status(403).json({
      success: false,
      message: 'Pro subscription required to unlock this workout day.',
      isProRequired: true,
      subscriptionStatus: req.user.subscriptionStatus,
      priceINR: Number(process.env.SUBSCRIPTION_PRICE_INR || 299),
    });
  }

  next();
};
