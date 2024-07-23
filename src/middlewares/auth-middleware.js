const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authenticationHeader = req.headers.authorization;
  const token = authenticationHeader && authenticationHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'Token not provided' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) res.status(403).send({ message: 'Invalid token' });
    else {
      req.user = user;
      next();
    }
  });
};

module.exports = authMiddleware;