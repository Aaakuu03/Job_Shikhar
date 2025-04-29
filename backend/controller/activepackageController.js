import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getActiveEmployerPackage = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log("🔍 User ID from token:", req.userId);

    if (!req.userId || req.userType !== "EMPLOYER") {
      console.error("❌ Unauthorized access attempt");
      return res
        .status(401)
        .json({ error: "Unauthorized - Employer role required" });
    }

    // Fetch employer ID using userId
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });

    if (!employer) {
      console.error("❌ Employer record not found for userId:", req.userId);
      return res
        .status(403)
        .json({ message: "Forbidden - No employer record found" });
    }

    const employerId = employer.id;
    console.log("✅ Employer ID from DB:", employerId);

    const activePackage = await prisma.employerPackage.findFirst({
      where: {
        employerId,
      },
      include: {
        package: true,
      },
    });

    if (!activePackage) {
      return res.status(404).json({ message: "No active package found." });
    }

    res.json({
      id: activePackage.id,
      expiresAt: activePackage.expiresAt,
      package: activePackage.package.name,
    });
  } catch (error) {
    console.error("❌ Error fetching active employer package:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllEmployerPackages = async (req, res) => {
  try {
    if (!req.userId || req.userType !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const packages = await prisma.employerPackage.findMany({
      include: {
        employer: {
          select: {
            id: true,
            companyName: true,
            user: { select: { email: true } },
          },
        },
        package: true,
        payments: true,
      },
    });

    res.json(packages);
  } catch (error) {
    console.error("❌ Failed to fetch employer packages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to check if the employer has an active package
const checkActivePackage = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log("🔍 User ID from token:", req.userId);

    if (!req.userId || req.userType !== "EMPLOYER") {
      console.error("❌ Unauthorized access attempt");
      return res
        .status(401)
        .json({ error: "Unauthorized - Employer role required" });
    }

    // Fetch the employer record using userId
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId }, // Fetch employer using the userId
      select: { id: true },
    });

    if (!employer) {
      console.error("❌ Employer record not found for userId:", userId);
      return res
        .status(403)
        .json({ message: "Forbidden - No employer record found" });
    }

    const employerId = employer.id;
    console.log("✅ Employer ID from DB:", employerId);

    // Check if the employer already has an active package
    const activePackage = await prisma.employerPackage.findFirst({
      where: {
        employerId: employerId, // Using employerId directly
        expiresAt: { gt: new Date() }, // Ensure the package hasn't expired
      },
    });

    if (activePackage) {
      // Respond with active package details
      return res.status(200).json({ hasActivePackage: true, activePackage });
    } else {
      // If no active package exists
      return res.status(200).json({ hasActivePackage: false });
    }
  } catch (error) {
    console.error("Error checking active package:", error);
    res.status(500).json({ error: "Failed to check active package" });
  }
};
export { getActiveEmployerPackage, getAllEmployerPackages, checkActivePackage };
