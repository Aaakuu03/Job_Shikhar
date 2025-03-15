// educationController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addEducation = async (req, res) => {
  try {
    const {
      degree,
      courseProgram,
      board,
      college,
      startDate,
      endDate,
      currentlyStudying = false, // Default value set to false
    } = req.body;

    // Validate required fields
    if (!degree || !board || !college || !startDate) {
      return res.status(400).json({
        error: "Degree, board, college, and start date are required.",
      });
    }

    // Validate date fields based on currentlyStudying
    if (currentlyStudying && endDate) {
      return res.status(400).json({
        error: "End date should not be provided if currently studying is true.",
      });
    }

    if (!currentlyStudying && !endDate) {
      return res.status(400).json({
        error: "End date is required if currently studying is false.",
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
    const education = await prisma.education.create({
      data: {
        degree,
        courseProgram,
        board,
        college,
        startDate: startDateInt, // Save as year integer
        endDate: endDateInt, // Save as year integer
        currentlyStudying,
        jobSeekerId: jobSeeker.id,
      },
    });

    return res.status(201).json({
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error("Error adding education:", error);
    return res.status(500).json({
      message: "Error adding education",
      error: error.message,
    });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { id } = req.params; // Getting ID from URL parameters
    const {
      degree,
      courseProgram,
      board,
      college,
      startDate,
      endDate,
      currentlyStudying = false, // Default value set to false
    } = req.body;

    // Validate required fields
    if (!degree || !board || !college || !startDate) {
      return res.status(400).json({
        error: "Degree, board, college, and start date are required.",
      });
    }

    // Validate date fields based on currentlyStudying
    if (currentlyStudying && endDate) {
      return res.status(400).json({
        error: "End date should not be provided if currently studying is true.",
      });
    }

    if (!currentlyStudying && !endDate) {
      return res.status(400).json({
        error: "End date is required if currently studying is false.",
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

    // Check if Education exists
    const existingEducation = await prisma.education.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }

    // Update education record
    const updatedEducation = await prisma.education.update({
      where: { id },
      data: {
        degree,
        courseProgram,
        board,
        college,
        startDate: startDateInt, // Save as year integer
        endDate: endDateInt, // Save as year integer
        currentlyStudying,
      },
    });

    return res.status(200).json({
      message: "Education updated successfully",
      education: updatedEducation,
    });
  } catch (error) {
    console.error("Error updating education:", error);
    return res.status(500).json({
      message: "Error updating education",
      error: error.message,
    });
  }
};

const deleteEducation = async (req, res) => {
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

    // Check if Education exists
    const existingEducation = await prisma.education.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingEducation) {
      return res.status(404).json({ error: "Education not found" });
    }

    // Delete education record
    await prisma.education.delete({ where: { id } });

    return res.status(200).json({ message: "Education deleted successfully" });
  } catch (error) {
    console.error("Error deleting education:", error);
    return res.status(500).json({
      message: "Error deleting education",
      error: error.message,
    });
  }
};

const getEducation = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
      include: { education: true },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    return res.status(200).json({ education: jobSeeker.education });
  } catch (error) {
    console.error("Error fetching education:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getEducationById = async (req, res) => {
  try {
    const { educationId } = req.params; // Extract educationId from URL parameters

    // Find the education record using the educationId
    const education = await prisma.education.findUnique({
      where: { id: educationId }, // Assuming 'id' is the primary key for education
    });

    // Check if education record exists
    if (!education) {
      return res.status(404).json({ error: "Education record not found" });
    }

    // Return the found education record
    return res.status(200).json({ education });
  } catch (error) {
    console.error("Error fetching education by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  addEducation,
  updateEducation,
  deleteEducation,
  getEducation,
  getEducationById,
};
