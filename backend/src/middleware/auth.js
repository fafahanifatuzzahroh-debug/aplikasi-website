import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = header.slice(7);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid' });
  }
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Belum terautentikasi' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Akses ditolak' });
    }

    return next();
  };
}
