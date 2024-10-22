const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(400).json({ message: "unauthenticate" });

  jwt.verify(token, process.env.jwt, (err, decode) => {
    if (err) return res.status(401).json({ message: "invalid code" });
    req.userId = decode;

    next();
  });
};

module.exports = verifyToken;
