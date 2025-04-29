import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
const prisma = new PrismaClient();

dotenv.config();
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate Token
    const token = jwt.sign({ adminId: admin.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    // Set cookie with HttpOnly flag
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "strict",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalJobSeekers,
      totalEmployers,
      totalApplications,
      totalJobs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { userType: "JOBSEEKER" } }),
      prisma.user.count({ where: { userType: "EMPLOYER" } }),
      prisma.application.count(),
      prisma.job.count(),
    ]);

    // ✅ Correct MySQL query for monthly applications
    const applicationsPerMonthRaw = await prisma.$queryRawUnsafe(`
      SELECT 
        DATE_FORMAT(appliedAt, '%Y-%m') AS month,
        COUNT(*) AS count 
      FROM Application 
      GROUP BY month 
      ORDER BY month;
    `);

    // ✅ Correct MySQL query for monthly job posts
    const jobsPerMonthRaw = await prisma.$queryRawUnsafe(`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m') AS month,
        COUNT(*) AS count 
      FROM Job 
      GROUP BY month 
      ORDER BY month;
    `);

    const applicationsPerMonth = applicationsPerMonthRaw.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));

    const jobsPerMonth = jobsPerMonthRaw.map((row) => ({
      month: row.month,
      count: Number(row.count),
    }));

    // ✅ Get latest 5 jobs
    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
      },
    });

    // ✅ Get latest 5 applications
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { appliedAt: "desc" },
      include: {
        job: true,
        jobSeeker: {
          include: {
            user: true,
          },
        },
      },
    });

    res.json({
      totalUsers,
      totalJobSeekers,
      totalEmployers,
      totalApplications,
      totalJobs,
      applicationsPerMonth,
      jobsPerMonth,
      recentJobs,
      recentApplications,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};

export const createPackage = async (req, res) => {
  if (req.method === "POST") {
    const { name, price, jobLimit, duration } = req.body;

    if (!name || !price || !jobLimit || !duration) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const newPackage = await prisma.pricingPackage.create({
        data: {
          name,
          price,
          jobLimit,
          duration, // Duration in months
        },
      });
      return res.status(201).json(newPackage);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to create pricing package" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

// Get all payment records (admin)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        employer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        package: {
          select: { name: true, price: true, duration: true },
        },
        employerPackage: {
          select: {
            expiresAt: true,
            jobCount: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payment records." });
  }
};

export const getActivePackages = async (req, res) => {
  try {
    const activePackages = await prisma.employerPackage.findMany({
      where: {
        expiresAt: {
          gte: new Date(), // Only show currently active packages
        },
      },
      include: {
        employer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        package: {
          select: {
            name: true,
            price: true,
            duration: true,
          },
        },
      },
      orderBy: {
        expiresAt: "asc", // Soonest to expire on top
      },
    });

    res.json(activePackages);
  } catch (error) {
    console.error("Error fetching active packages:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch active employer packages." });
  }
};

export { adminLogin };
