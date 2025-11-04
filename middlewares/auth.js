// middlewares/auth.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token using secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the employee ID to the request object
      req.user = decoded.id;

      // Continue to next middleware or route
      next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }
};

module.exports = protect;
