import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Job Seeker Profile
const getJobSeekerProfile = async (req, res) => {
  console.log("req.userId:", req.userId); // Check if userId is present
  try {
    const profile = await prisma.user.findUnique({
      where: { id: req.userId }, // Ensure it matches your schema
      include: { jobSeeker: true },
    });

    if (!profile) {
      return res.status(404).json({ error: "Job seeker not found" });
    }

    res
      .status(200)
      .json({ message: "Job seeker profile retrieved successfully", profile });
  } catch (error) {
    console.error("Error:", error); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update Job Seeker Profile
const updateJobSeekerProfile = async (req, res) => {
  try {
    const { name, phoneNumber, address, dob, gender, maritalStatus } = req.body;

    if (!req.userId) {
      return res.status(400).json({ error: "User ID is missing from token." });
    }

    // Ensure the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure the JobSeeker profile exists
    const existingProfile = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: "Job seeker profile not found." });
    }

    // Update the User table (for name and phone)
    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name,
        phoneNumber,
      },
    });

    // Update the Jobseeker table (for address, dob, gender, marital status)
    const updatedJobseeker = await prisma.jobSeeker.update({
      where: { userId: req.userId },
      data: {
        address,
        dob: new Date(dob),
        gender,
        maritalStatus,
      },
    });

    res.status(200).json({
      message: "Jobseeker information updated successfully",
      updatedUser,
      updatedJobseeker,
    });
  } catch (error) {
    console.error("Error updating jobseeker information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePreferredJob = async (req, res) => {
  try {
    const {
      skills,
      preferredJobLocation,
      expectedSalary = 0,
      currency = "NRS",
      salaryType = "above",
      salaryFrequency = "monthly",
      jobType = "Full Time",
    } = req.body;

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

    // Update the jobSeeker record
    const updatedJobseeker = await prisma.jobSeeker.update({
      where: { id: jobSeeker.id },
      data: {
        skills,
        preferredJobLocation,
        expectedSalary,
        currency,
        salaryType,
        salaryFrequency,
        jobType,
      },
    });

    res.status(200).json({
      message: "Preferred job information updated successfully",
      updatedJobseeker,
    });
  } catch (error) {
    console.error("Error updating Preferred Job information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// controllers/jobSeekerController.js
const createJobSeekerProfile = async (req, res) => {
  try {
    const {
      dob,
      gender,
      address,
      preferredJobLocation,
      jobType,
      expectedSalary,
      currency,
      salaryType,
      salaryFrequency,
      skills,
    } = req.body;

    // Ensure required fields are provided (if applicable)
    if (!req.userId) {
      return res.status(400).json({ error: "User ID is missing from token." });
    }

    // Ensure the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the JobSeeker profile already exists
    const existingProfile = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Job seeker profile already exists." });
    }

    // Create the JobSeeker profile
    const newProfile = await prisma.jobSeeker.create({
      data: {
        userId: req.userId,
        dob: new Date(dob), // Ensure ISO-8601 format (e.g., "1995-08-15")
        gender: gender,
        jobType: jobType,
        address: address,
        expectedSalary: parseInt(expectedSalary, 10),
        currency,
        salaryType,
        salaryFrequency,
        preferredJobLocation: preferredJobLocation,
        skills: skills,
      },
      include: {
        user: true,
      },
    });

    // Update `isFormFilled` to true after successful profile creation
    await prisma.user.update({
      where: { id: req.userId },
      data: { isFormFilled: true },
    });

    res.status(201).json({
      message: "Job seeker profile created successfully.",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating job seeker profile:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

// Get Preferred Job Information by ID
const getPreferredJobById = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the job seeker by ID
    const preferredJob = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!preferredJob) {
      console.log("JobSeeker not found for ID:", id);
      return res
        .status(404)
        .json({ error: "Preferred job information not found" });
    }

    res.status(200).json({ preferredJob });
  } catch (error) {
    console.error("Error fetching preferred job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPreferredJobs = async (req, res) => {
  try {
    console.log("📊 Fetching all preferred job information");

    // Fetch all job seekers and their preferred job details
    const allPreferredJobs = await prisma.jobSeeker.findMany({
      include: {
        user: true, // Include user details if needed (optional)
      },
    });

    if (!allPreferredJobs || allPreferredJobs.length === 0) {
      return res.status(404).json({ message: "No job seeker profiles found." });
    }

    res.status(200).json({ allPreferredJobs });
  } catch (error) {
    console.error("❗ Error fetching all preferred jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller: jobseekerController.js

const getBasicInformationById = async (req, res) => {
  try {
    // Extract user ID from URL parameters
    const { id: userId } = req.params;
    console.log("🔎 Requested User ID:", userId);

    // Ensure the user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Validate user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Find the user and associated job seeker information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        jobSeeker: true, // Fetch JobSeeker info if available
      },
    });

    // Check if user exists and is a job seeker
    if (!user || !user.jobSeeker) {
      console.log("❌ User or JobSeeker not found for ID:", userId);
      return res.status(404).json({ error: "User or JobSeeker not found" });
    }

    // Ensure user access control (Prevent unauthorized access)
    if (user.id !== req.userId) {
      console.log("🚫 Unauthorized access attempt for User ID:", userId);
      return res.status(403).json({ error: "Access forbidden" });
    }

    // Construct the response with necessary fields
    const basicInfo = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      dob: user.jobSeeker.dob,
      gender: user.jobSeeker.gender,
      address: user.jobSeeker.address,
    };

    return res.status(200).json({ basicInfo });
  } catch (error) {
    console.error("❗ Error fetching User information by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getJobSeekerDetails = async (req, res) => {
  try {
    // Extract the userId from the request parameters
    const { id: userId } = req.params;
    console.log("🔎 Requested User ID:", userId);

    // Ensure the user is authenticated
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Fetch user and job seeker information
    const userWithJobSeeker = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        jobSeeker: {
          select: {
            id: true, // jobSeekerId
            dob: true,
            gender: true,
            address: true,
            expectedSalary: true,
            currency: true,
            salaryType: true,
            salaryFrequency: true,
            jobType: true,
            preferredJobLocation: true,
            skills: true,
            education: {
              select: {
                degree: true,
                courseProgram: true,
                board: true,
                college: true,
                startDate: true,
                endDate: true,
                currentlyStudying: true,
              },
              orderBy: { startDate: "desc" }, // Latest education first
            },
            training: {
              select: {
                trainingName: true,
                institute: true,
                duration: true,
                year: true,
              },
              orderBy: { year: "desc" }, // Latest training first
            },
            workExperience: {
              select: {
                companyName: true,
                position: true,
                jobLocation: true,
                startDate: true,
                endDate: true,
                description: true,
              },
              orderBy: { startDate: "desc" }, // Latest experience first
            },
          },
        },
      },
    });

    // If no user or job seeker is found
    if (!userWithJobSeeker || !userWithJobSeeker.jobSeeker) {
      return res.status(404).json({ error: "JobSeeker not found" });
    }

    // Ensure the requesting user owns the profile
    if (userWithJobSeeker.id !== req.userId) {
      return res.status(403).json({ error: "Access forbidden" });
    }

    // Destructure data for cleaner output
    const { name, email, phoneNumber, jobSeeker } = userWithJobSeeker;

    const responseData = {
      basicInformation: {
        name,
        email,
        phoneNumber,
        dob: jobSeeker.dob,
        gender: jobSeeker.gender,
        address: jobSeeker.address,
        expectedSalary: jobSeeker.expectedSalary,
        currency: jobSeeker.currency,
        salaryType: jobSeeker.salaryType,
        salaryFrequency: jobSeeker.salaryFrequency,
        jobType: jobSeeker.jobType,
        preferredJobLocation: jobSeeker.preferredJobLocation,
        skills: jobSeeker.skills.split(",").map((skill) => skill.trim()), // Convert skills to array
      },
      education: jobSeeker.education,
      training: jobSeeker.training,
      workExperience: jobSeeker.workExperience,
    };

    // Return the structured response
    res.status(200).json(responseData);
  } catch (error) {
    console.error("❗ Error fetching JobSeeker details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  createJobSeekerProfile,
  updatePreferredJob,
  getPreferredJobById,
  getAllPreferredJobs,
  getBasicInformationById,
  getJobSeekerDetails,
};
