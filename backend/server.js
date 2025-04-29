import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import jobseekerRouter from "./routes/jobseekerRoutes.js";
import educationRouter from "./routes/educationRoutes.js";
import employerRouter from "./routes/employerRoutes.js";
import trainingRouter from "./routes/trainingRoutes.js";
import workExperienceRouter from "./routes/workexperienceRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import applicationRouter from "./routes/applicationRoutes.js";
import logoutRouter from "./routes/logoutRoutes.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import adminRouter from "./routes/adminRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import whishlistRouter from "./routes/whishlistRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(cookieParser());

console.log("SECRET_KEY:", process.env.SECRET_KEY);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Fix spelling mistake here
  })
);

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRouter);
app.use("/api/jobseeker", jobseekerRouter);
app.use("/api/education", educationRouter);
app.use("/api/training", trainingRouter);
app.use("/api/employer", applicationRouter);
app.use("/api/workexperience", workExperienceRouter);
app.use("/api/jobseekers", jobRouter);
app.use("/api/employers", employerRouter);
app.use("/api/workexperience", workExperienceRouter);
app.use("/api/user", logoutRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin/category", categoryRouter);
app.use("/api/whishlist", whishlistRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.json({ respond: "Hello World" });
});

const createDefaultAdmin = async () => {
  try {
    const adminExists = await prisma.admin.findUnique({
      where: { email: "jobshikhar@gmail.com" }, // ✅ Use email (unique field)
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("jobshikhar123", 10);
      await prisma.admin.create({
        data: {
          email: "jobshikhar@gmail.com",
          name: "Admin", // You can still set a name, but it’s not unique
          password: hashedPassword,
        },
      });
      console.log("✅ Default admin created.");
    } else {
      console.log("ℹ Default admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error);
  }
};

// Call the function on server startup
createDefaultAdmin();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
