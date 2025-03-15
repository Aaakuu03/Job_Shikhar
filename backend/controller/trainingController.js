// trainingController.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addTraining = async (req, res) => {
  try {
    const { trainingName, institute, duration, year } = req.body;

    // Validate required fields
    if (!trainingName || !institute || !year) {
      return res.status(400).json({
        error: "Training name, institute, and year are required.",
      });
    }

    // Validate year format
    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return res.status(400).json({
        error: "Invalid year format or year is in the future.",
      });
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

    // Create training record
    const training = await prisma.training.create({
      data: {
        trainingName,
        institute,
        duration,
        year,
        jobSeekerId: jobSeeker.id,
      },
    });

    return res.status(201).json({
      message: "Training added successfully",
      training,
    });
  } catch (error) {
    console.error("Error adding training:", error);
    return res.status(500).json({
      message: "Error adding training",
      error: error.message,
    });
  }
};

const updateTraining = async (req, res) => {
  try {
    const { id } = req.params; // Getting ID from URL parameters
    const { trainingName, institute, duration, year } = req.body; // Extracting data from request body

    // Validate required fields
    if (!trainingName || !institute || !year) {
      return res.status(400).json({
        error: "Training name, institute, and year are required.",
      });
    }

    // Validate year format
    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return res.status(400).json({
        error: "Invalid year format or year is in the future.",
      });
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

    // Check if Training exists
    const existingTraining = await prisma.training.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingTraining) {
      return res.status(404).json({ error: "Training record not found" });
    }

    // Update training record
    const updatedTraining = await prisma.training.update({
      where: { id },
      data: {
        trainingName,
        institute,
        duration,
        year,
      },
    });

    return res.status(200).json({
      message: "Training updated successfully",
      training: updatedTraining,
    });
  } catch (error) {
    console.error("Error updating training:", error);
    return res.status(500).json({
      message: "Error updating training",
      error: error.message,
    });
  }
};

const deleteTraining = async (req, res) => {
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

    // Check if Training exists
    const existingTraining = await prisma.training.findFirst({
      where: { id, jobSeekerId: jobSeeker.id },
    });

    if (!existingTraining) {
      return res.status(404).json({ error: "Training not found" });
    }

    // Delete training record
    await prisma.training.delete({ where: { id } });

    return res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    console.error("Error deleting training:", error);
    return res.status(500).json({
      message: "Error deleting training",
      error: error.message,
    });
  }
};

const getTraining = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
      include: { training: true },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    return res.status(200).json({ training: jobSeeker.training });
  } catch (error) {
    console.error("Error fetching training:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTrainingById = async (req, res) => {
  try {
    const { trainingId } = req.params; // Extract trainingId from URL parameters

    // Find the training record using the trainingId
    const training = await prisma.training.findUnique({
      where: { id: trainingId }, // Assuming 'id' is the primary key for training
    });

    // Check if training record exists
    if (!training) {
      return res.status(404).json({ error: "training record not found" });
    }

    // Return the found training record
    return res.status(200).json({ training });
  } catch (error) {
    console.error("Error fetching training by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export {
  addTraining,
  updateTraining,
  deleteTraining,
  getTraining,
  getTrainingById,
};
