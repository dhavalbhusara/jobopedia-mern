const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '519e2c58594799d127a7be956e4a503bfbd01d9ff6dca898249064abf5c47ba9b5523246da83b206a473b6d8946835e57f76ccefa7c6f6c2274ca1fe666da928';

/**
 * Verify JWT token from Authorization header
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Access denied: Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid token. Please log in again.' });
  }
};

/**
 * Require ADMIN role
 */
const requireAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const adminRoles = ['ADMIN', 'SUPER_ADMIN', 'HR_ADMIN', 'CONTENT_ADMIN'];
    if (!req.user || !adminRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden: Administrator privileges required.' });
    }
    next();
  });
};

module.exports = {
  verifyToken,
  requireAdmin
};
