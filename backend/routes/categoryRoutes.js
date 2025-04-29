import express from "express";

import { authenticateAdmin } from "../middleware/adminVerify.js";
import {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} from "../controller/admin/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/create", authenticateAdmin, createCategory);
categoryRouter.get("/get", authenticateAdmin, getCategory);
categoryRouter.delete("/delete/:id", authenticateAdmin, deleteCategory);
categoryRouter.put("/update/:id", authenticateAdmin, updateCategory);

export default categoryRouter;
