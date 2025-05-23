import { PrismaClient } from "@prisma/client";

import path from "path";
import fs from "fs";
import multer from "multer";
const prisma = new PrismaClient();
// Set up multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Ensure the 'uploads' folder exists
    }
    cb(null, dir); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});

const upload = multer({ storage }); // Configure multer with the storage settings

// Middleware for handling file uploads
const uploadImage = upload.single("image"); // Use 'image' field name for the file
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
// Update Job Seeker Profile
const updateJobSeekerProfile = async (req, res) => {
  try {
    const { name, phoneNumber, address, dob, gender, maritalStatus } = req.body;
    let imageUrl = null;

    if (!req.userId) {
      return res.status(400).json({ error: "User ID is missing from token." });
    }

    // Upload image and continue inside callback
    uploadImage(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Image upload failed", error: err.message });
      }

      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`; // Save the new image URL
      }
      // Validate and convert date of birth
      let parsedDOB = undefined;
      if (dob && !isNaN(Date.parse(dob))) {
        parsedDOB = new Date(dob);
      } else if (dob) {
        return res.status(400).json({ error: "Invalid date of birth." });
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

      // Update the User table (for name, phoneNumber, image)
      const updatedUser = await prisma.user.update({
        where: { id: req.userId },
        data: {
          name,
          phoneNumber,
        },
      });

      // Prepare conditional update data
      const jobSeekerUpdateData = {};
      if (address) jobSeekerUpdateData.address = address;
      if (parsedDOB) jobSeekerUpdateData.dob = parsedDOB;
      if (gender) jobSeekerUpdateData.gender = gender;
      if (typeof maritalStatus !== "undefined")
        jobSeekerUpdateData.maritalStatus = maritalStatus;
      if (imageUrl) jobSeekerUpdateData.imageUrl = imageUrl;

      // Update job seeker
      const updatedJobseeker = await prisma.jobSeeker.update({
        where: { userId: req.userId },
        data: jobSeekerUpdateData,
      });

      res.status(200).json({
        message: "Jobseeker information updated successfully",
        updatedUser,
        updatedJobseeker,
      });
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

const createJobSeekerProfile = async (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err.message });
    }
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
        return res
          .status(400)
          .json({ error: "User ID is missing from token." });
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
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the image URL

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
          imageUrl,
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
  });
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
      imageUrl: user.jobSeeker.imageUrl,
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
            imageUrl: true,
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
        imageUrl: jobSeeker.imageUrl,

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

const getNotification = async (req, res) => {
  try {
    const userId = req.userId; // Extract authenticated user ID

    // Verify if the user exists and is a JOBSEEKER
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userType: true },
    });

    if (!user || user.userType !== "JOBSEEKER") {
      return res
        .status(403)
        .json({ error: "Access denied. Not a job seeker." });
    }

    // Find the corresponding job seeker ID using the userId
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId },
      select: { id: true }, // Fetch only the job seeker ID
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker profile not found." });
    }

    // Fetch notifications for the job seeker
    const notifications = await prisma.notification.findMany({
      where: { jobSeekerId: jobSeeker.id },
      orderBy: { createdAt: "desc" },
    });

    res.json(notifications);
  } catch (error) {
    console.error("🔥 Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const searchJobs = async (req, res) => {
  console.log("✅ Route Hit!"); // Confirm route is being called

  try {
    const { keyword } = req.query;
    console.log("🔍 Received Keyword:", keyword); // Log received keyword

    if (!keyword) {
      console.log("🛑 No keyword provided!");
      return res.status(400).json({ message: "Keyword is required" });
    }

    console.log("🔍 Searching for jobs with keyword:", keyword);

    const jobs = await prisma.job.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
          { requirement: { contains: keyword } },
          { salary: { contains: keyword } },
          {
            employer: {
              OR: [
                { contactName: { contains: keyword } },
                { aboutCompany: { contains: keyword } },
                { address: { contains: keyword } },
                {
                  user: {
                    OR: [
                      { name: { contains: keyword } },
                      { email: { contains: keyword } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      include: {
        employer: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log("📝 Query Result:", jobs);

    if (jobs.length === 0) {
      console.log("🚨 No jobs found for keyword:", keyword);
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error in searchJobs:", error);
    res.status(500).json({ message: "Error searching jobs" });
  }
};

// const searchJobs = async (req, res) => {
//   console.log("✅ Route Hit!"); // Confirm route is being called

//   try {
//     const { keyword, jobType } = req.query; // Capture jobType filter
//     console.log("🔍 Received Keyword:", keyword, "Job Type:", jobType); // Log received keyword and jobType

//     if (!keyword) {
//       console.log("🛑 No keyword provided!");
//       return res.status(400).json({ message: "Keyword is required" });
//     }

//     const jobs = await prisma.job.findMany({
//       where: {
//         OR: [
//           { title: { contains: keyword, mode: "insensitive" } },
//           { description: { contains: keyword, mode: "insensitive" } },
//           { requirement: { contains: keyword, mode: "insensitive" } },
//           { salary: { contains: keyword, mode: "insensitive" } },
//         ],
//         jobType: jobType ? jobType.toUpperCase() : undefined, // Filter by job type if provided
//       },
//     });

//     console.log("📝 Query Result:", jobs);

//     if (jobs.length === 0) {
//       console.log("🚨 No jobs found for keyword:", keyword);
//       return res.status(404).json({ message: "Job not found" });
//     }

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error("❌ Error in searchJobs:", error);
//     res.status(500).json({ message: "Error searching jobs" });
//   }
// };

export {
  getJobSeekerProfile,
  updateJobSeekerProfile,
  createJobSeekerProfile,
  updatePreferredJob,
  getPreferredJobById,
  getAllPreferredJobs,
  getBasicInformationById,
  getJobSeekerDetails,
  getNotification,
  searchJobs,
};
