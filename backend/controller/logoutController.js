// controllers/logout.js
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

const logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ error: "Token not found in cookies." });
    }

    // Remove token from DB
    const deletedToken = await prisma.token.deleteMany({
      where: { token },
    });

    // Clear the cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Logout failed." });
  }
};

export { logout };
