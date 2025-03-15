// educationController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addWorkExperience = async (req, res) => {
  try {
    const {
      position,
      companyName,
      jobLocation,
      startDate,
      endDate,
      description,
    } = req.body;

    // Validate required fields
    if (!position || !companyName || !startDate || !jobLocation || !endDate) {
      return res.status(400).json({
        error:
          "Position, companyName, start date,  endDate and jobLocation are required.",
      });
    }

    // Ensure startDate and endDate are valid integers (years)
    const startDateInt = parseInt(startDate);
    if (isNaN(startDateInt)) {
      return res.status(400).json({
        error: "Invalid start date format. It should be a year (integer).",
      });
    }

    let endDateInt = null;
    if (endDate) {
      endDateInt = parseInt(endDate);
      if (isNaN(endDateInt)) {
        return res.status(400).json({
          error: "Invalid end date format. It should be a year (integer).",
        });
      }
    }

    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if JobSeeker exists by userId
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    // Create education record
    const workExperience = await prisma.workExperience.create({
      data: {
        position,
        companyName,
        startDate: startDateInt, // Save as year integer
        endDate: endDateInt, // Save as year integer
        description,
        jobLocation,
        jobSeekerId: jobSeeker.id,
      },
    });

    return res.status(201).json({
      message: "Work experience added successfully",
      workExperience,
    });
  } catch (error) {
    console.error("Error adding Work experience:", error);
    return res.status(500).json({
      message: "Error adding Work experience",
      error: error.message,
    });
  }
};

const updateWorkExperience = async (req, res) => {
  try {
    const { id } = req.params; // Getting ID from URL parameters
    const {
      position,
      companyName,
      jobLocation,
      startDate,
      endDate,
      description,
    } = req.body;

    // Validate required fields
    // Validate required fields
    if (!position || !companyName || !startDate || !jobLocation || !endDate) {
      return res.status(400).json({
        error:
          "Position, companyName, start date,  endDate and jobLocation are required.",
      });
    }

    // Ensure startDate and endDate are valid integers (years)
    const startDateInt = parseInt(startDate);
    if (isNaN(startDateInt)) {
      return res.status(400).json({
        error: "Invalid start date format. It should be a year (integer).",
      });
    }

    let endDateInt = null;
    if (endDate) {
      endDateInt = parseInt(endDate);
      if (isNaN(endDateInt)) {
        return res.status(400).json({
          error: "Invalid end date format. It should be a year (integer).",
        });
      }
    }

    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if JobSeeker exists by userId
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    // Check if work experience exists
    const existingWorkExperience = await prisma.workExperience.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingWorkExperience) {
      return res
        .status(404)
        .json({ error: "work Experience record not found" });
    }

    // Update education record
    const updatedWorkExperience = await prisma.workExperience.update({
      where: { id },
      data: {
        position,
        companyName,
        startDate: startDateInt, // Save as year integer
        endDate: endDateInt, // Save as year integer
        description,
        jobLocation,
      },
    });

    return res.status(200).json({
      message: "Work Experience updated successfully",
      education: updatedWorkExperience,
    });
  } catch (error) {
    console.error("Error updating Work Experience:", error);
    return res.status(500).json({
      message: "Error updating Work Experience",
      error: error.message,
    });
  }
};

const deleteWorkExperience = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if JobSeeker exists by userId
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    // Check if Work Experience exists
    const existingWorkExperience = await prisma.workExperience.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingWorkExperience) {
      return res.status(404).json({ error: "Work Experience not found" });
    }

    // Delete Work Experience record
    await prisma.workExperience.delete({ where: { id } });

    return res
      .status(200)
      .json({ message: "Work Experience deleted successfully" });
  } catch (error) {
    console.error("Error deleting Work Experience:", error);
    return res.status(500).json({
      message: "Error deleting Work Experience",
      error: error.message,
    });
  }
};

const getWorkExperience = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
      include: { workExperience: true },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    return res.status(200).json({ workExperience: jobSeeker.workExperience });
  } catch (error) {
    console.error("Error fetching Work Experience:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getWorkExperienceById = async (req, res) => {
  try {
    const { id } = req.params; // Ensure this matches the route parameter

    if (!id) {
      return res.status(400).json({ error: "WorkExperience ID is required" });
    }

    // Log for debugging
    console.log("Fetching WorkExperience with ID:", id);

    // Fetch the workExperience record by ID
    const workExperience = await prisma.workExperience.findUnique({
      where: { id },
    });

    if (!workExperience) {
      return res.status(404).json({ error: "WorkExperience record not found" });
    }

    return res.status(200).json({ workExperience });
  } catch (error) {
    console.error("Error fetching workExperience by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  getWorkExperience,
  getWorkExperienceById,
};
