// In-Memory Rate Limiter to prevent Brute-Force and DoS attacks

const createRateLimiter = ({ windowMs = 60 * 1000, max = 100, message = 'Too many requests. Please try again later.' }) => {
  const hits = new Map();

  // Periodic cleanup every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of hits.entries()) {
      if (now - record.startTime > windowMs) {
        hits.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  return (req, res, next) => {
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const key = `${clientIp}_${req.baseUrl || req.path}`;
    const now = Date.now();

    const record = hits.get(key);

    if (!record) {
      hits.set(key, { count: 1, startTime: now });
      return next();
    }

    if (now - record.startTime > windowMs) {
      hits.set(key, { count: 1, startTime: now });
      return next();
    }

    record.count++;

    if (record.count > max) {
      const waitMinutes = Math.ceil((windowMs - (now - record.startTime)) / 60000);
      return res.status(429).json({
        success: false,
        error: message,
        retryAfterMinutes: waitMinutes
      });
    }

    next();
  };
};

// Strict Limiter for Login (Max 10 attempts per 15 minutes)
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Security Alert: Too many login attempts. Your IP has been temporarily locked. Please try again after 15 minutes.'
});

// General Limiter for Public API (Max 180 requests per minute)
const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 180,
  message: 'Too many requests. Please slow down.'
});

module.exports = {
  loginLimiter,
  apiLimiter
};
