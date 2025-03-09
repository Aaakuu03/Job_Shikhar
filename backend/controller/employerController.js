import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Employer Profile
const getEmployerProfile = async (req, res) => {
  console.log("req.userId:", req.userId); // Check if userId is present
  try {
    const profile = await prisma.user.findUnique({
      where: { id: req.userId }, // Ensure it matches your schema
      include: { employer: true },
    });

    if (!profile) {
      return res.status(404).json({ error: "Employer found" });
    }

    res
      .status(200)
      .json({ message: "Employer profile retrieved successfully", profile });
  } catch (error) {
    console.error("Error:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getEmployerProfile };
