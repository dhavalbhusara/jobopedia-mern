// NoSQL Injection Prevention & Data Sanitization Middleware

function sanitizeInput(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  for (const key of Object.keys(obj)) {
    // Block MongoDB operator injection ($gt, $ne, $where, etc.)
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
      continue;
    }

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeInput(obj[key]);
    }
  }
  return obj;
}

const noSqlSanitizer = (req, res, next) => {
  if (req.body) req.body = sanitizeInput(req.body);
  if (req.query) req.query = sanitizeInput(req.query);
  if (req.params) req.params = sanitizeInput(req.params);
  next();
};

module.exports = {
  noSqlSanitizer
};
