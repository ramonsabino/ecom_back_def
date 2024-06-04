const jwt = require('jsonwebtoken');

const renewToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err && err.name === 'TokenExpiredError') {
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${newToken}`);
      }
      next();
    });
  } else {
    next();
  }
};

module.exports = renewToken;