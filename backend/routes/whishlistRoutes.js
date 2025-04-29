import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controller/whishlistController.js";
import { verifyToken } from "../middleware/jwtVerify.js";
const whishlistRouter = express.Router();

// Add a job to the wishlist
whishlistRouter.post("/add", verifyToken, addToWishlist);

// Get all jobs in the wishlist for a specific job seeker
whishlistRouter.get("/get", verifyToken, getWishlist);

// Remove a job from the wishlist
whishlistRouter.delete("/remove/:id", verifyToken, removeFromWishlist);

export default whishlistRouter;
