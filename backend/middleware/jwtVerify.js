import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY || "fallback_secret";

const verifyToken = (req, res, next) => {
  console.log("Incoming Headers:", req.headers);
  console.log("Incoming Cookies:", req.cookies);

  // Try getting token from cookies first
  let token = req.cookies?.jwt;

  // If no token in cookies, check the Authorization header
  if (!token) {
    let authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    }
  }

  // If no token is found at all, return an error
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
