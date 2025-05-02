import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;

  // Check if no auth header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Add user from payload to request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;