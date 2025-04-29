import express from "express";
import {
  adminLogin,
  getActivePackages,
  getAllPayments,
  getDashboardStats,
} from "../controller/admin/adminController.js";
import {
  adminDeleteUser,
  jobLogList,
  listUsers,
} from "../controller/admin/usersController.js";
import { authenticateAdmin } from "../middleware/adminVerify.js";
import {
  createPackage,
  deletePackage,
  getPackage,
  updatePackage,
} from "../controller/admin/packageController.js";
import { getJobDetailsById } from "../controller/jobController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/users", authenticateAdmin, listUsers);
adminRouter.delete("/users/:id", authenticateAdmin, adminDeleteUser);
adminRouter.get("/dashboard-stats", authenticateAdmin, getDashboardStats);
adminRouter.get("/job-logs", authenticateAdmin, jobLogList);
adminRouter.post("/create-package", authenticateAdmin, createPackage);
adminRouter.get("/packages", authenticateAdmin, getPackage);
adminRouter.get("/payments", authenticateAdmin, getAllPayments);
adminRouter.get("/active-packages", authenticateAdmin, getActivePackages);
adminRouter.get("/jobdetails/:jobId", authenticateAdmin, getJobDetailsById);

adminRouter.put("/update-package/:id", authenticateAdmin, updatePackage);
adminRouter.delete("/delete-package/:id", authenticateAdmin, deletePackage);
// adminRouter.post("/menu", authenticateAdmi,);

export default adminRouter;
