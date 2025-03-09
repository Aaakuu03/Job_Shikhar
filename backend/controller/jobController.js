import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if JobSeeker exists
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    // Check if Profile is complete (if necessary fields are filled in)
    if (!jobSeeker.skills || !jobSeeker.jobType || !jobSeeker.salaryType) {
      return res
        .status(400)
        .json({ error: "Profile is incomplete. Please update your profile." });
    }

    // Check if Education exists and is updated
    const education = await prisma.education.findFirst({
      where: {
        jobSeekerId: jobSeeker.id,
      },
    });

    if (!education) {
      return res.status(400).json({
        error:
          "Education information is incomplete. Please update your education.",
      });
    }

    // Check if Training exists and is updated
    const training = await prisma.training.findFirst({
      where: {
        jobSeekerId: jobSeeker.id,
      },
    });

    if (!training) {
      return res.status(400).json({
        error:
          "Training information is incomplete. Please update your training.",
      });
    }

    // Check if Work Experience exists and is updated
    const workExperience = await prisma.workExperience.findFirst({
      where: {
        jobSeekerId: jobSeeker.id,
      },
    });

    if (!workExperience) {
      return res.status(400).json({
        error:
          "Work experience information is incomplete. Please update your work experience.",
      });
    }

    // If all checks pass, proceed with the job application
    const jobApplication = await prisma.application.create({
      data: {
        jobSeekerId: jobSeeker.id,
        jobId: jobId,
      },
    });

    res.status(200).json({
      message: "Job application successful",
      application: jobApplication,
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      message: "Error applying for job",
      error: error.message,
    });
  }
};

export { applyForJob };
