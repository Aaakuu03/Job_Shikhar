import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY || "fallback_secret";

const verifyToken = (req, res, next) => {
  console.log("Incoming Headers:", req.headers); // Debugging headers
  console.log("Using SECRET_KEY:", secret);

  // Extract token from Authorization header or 'jwt' cookie
  let token = req.headers["authorization"] || req.cookies?.jwt;

  // Handle Bearer token format
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  if (!token) {
    console.error("No token found");
    return res.status(403).json({ error: "No token provided" });
  }

  console.log("Token Verification - SECRET_KEY:", secret);

  try {
    const decoded = jwt.verify(token, secret);
    console.log("Decoded Token:", decoded);
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export { verifyToken };
