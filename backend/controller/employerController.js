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

// controllers/jobSeekerController.js
const createEmployerProfile = async (req, res) => {
  try {
    const {
      industryType,
      address,
      companySize,
      contactName,
      phone,
      aboutCompany,
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
    const existingProfile = await prisma.employer.findUnique({
      where: { userId: req.userId },
    });

    if (existingProfile) {
      return res
        .status(400)
        .json({ error: "Employer profile already exists." });
    }

    // Create the JobSeeker profile
    const newProfile = await prisma.employer.create({
      data: {
        userId: req.userId,
        industryType: industryType,
        address: address,
        companySize: companySize,
        contactName: contactName,
        phone: phone,
        aboutCompany: aboutCompany,
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
      message: "Employer profile created successfully.",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating employer profile:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const updateEmployerProfile = async (req, res) => {
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

    // Ensure dob is in Date format
    const parsedDob = dob ? new Date(dob) : undefined;

    // Check if the user exists
    const userExist = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    // Ensure the JobSeeker exists
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.userId },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker profile not found" });
    }

    // Update JobSeeker profile
    const updatedProfile = await prisma.jobSeeker.update({
      where: { userId: req.userId },
      data: {
        dob: parsedDob,
        gender,
        address,
        preferredJobLocation,
        jobType,
        expectedSalary: expectedSalary
          ? parseInt(expectedSalary, 10)
          : undefined,
        currency,
        salaryType,
        salaryFrequency,
        skills,
      },
    });

    res.status(200).json({
      message: "Job seeker profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      message: "Error updating job seeker profile",
      error: error.message,
    });
  }
};

export { getEmployerProfile, createEmployerProfile };
