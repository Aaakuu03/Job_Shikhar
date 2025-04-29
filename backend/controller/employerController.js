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

// Create Employer Profile
const createEmployerProfile = async (req, res) => {
  uploadImage(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Image upload failed", error: err.message });
    }

    // Debug: Log incoming request data
    // console.log("Request Body:", req.body); // Uncomment for debugging purposes
    // console.log("Uploaded File:", req.file); // Uncomment for debugging purposes

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

      // Check if the Employer profile already exists
      const existingProfile = await prisma.employer.findUnique({
        where: { userId: req.userId },
      });

      if (existingProfile) {
        return res
          .status(400)
          .json({ error: "Employer profile already exists." });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Get the image URL

      // Create the Employer profile
      const newProfile = await prisma.employer.create({
        data: {
          userId: req.userId,
          industryType,
          address,
          companySize,
          contactName,
          phone,
          aboutCompany,
          imageUrl,
        },
        include: {
          user: true, // Include user info in the response
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
  });
};

const updateEmployerProfile = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params

    const {
      name,
      phoneNumber,
      address,
      industryType,
      companySize,
      contactName,
      phone,
      aboutCompany,
    } = req.body;
    let imageUrl = null;
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
      // Ensure the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "User not found." });
      }

      // Ensure the employer profile exists
      const existingProfile = await prisma.employer.findUnique({
        where: { userId: id },
      });

      if (!existingProfile) {
        return res.status(404).json({ error: "Employer profile not found." });
      }

      // Update User table
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(phoneNumber && { phoneNumber }),
        },
      });

      // Update Employer table
      const updatedEmployer = await prisma.employer.update({
        where: { userId: id },
        data: {
          ...(address && { address }),
          ...(industryType && { industryType }),
          ...(companySize && { companySize }),
          ...(contactName && { contactName }),
          ...(phone && { phone }),
          ...(aboutCompany && { aboutCompany }),
          ...(imageUrl && { imageUrl }),
        },
      });

      res.status(200).json({
        message: "Employer information updated successfully",
        updatedUser,
        updatedEmployer,
      });
    });
  } catch (error) {
    console.error("Error updating Employer information:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCompanyDetails = async (req, res) => {
  try {
    const { id: userId } = req.params;
    console.log("🔎 Requested User ID:", userId);

    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const userWithEmployer = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        employer: {
          select: {
            id: true,
            industryType: true,
            address: true,
            companySize: true,
            contactName: true,
            phone: true,
            aboutCompany: true,
            imageUrl: true,
          },
        },
      },
    });

    console.log(
      "Fetched Employer Data:",
      JSON.stringify(userWithEmployer, null, 2)
    );

    if (!userWithEmployer || !userWithEmployer.employer.length) {
      return res.status(404).json({ error: "Employer profile not found" });
    }

    const { name, email, phoneNumber, employer } = userWithEmployer;

    // Extracting the first employer (change this logic if you want to return all employers)
    const firstEmployer = employer[0];

    const responseData = {
      basicInformation: {
        name,
        email,
        phoneNumber,
      },
      companyDetails: {
        industryType: firstEmployer.industryType || "N/A",
        address: firstEmployer.address || "N/A",
        companySize: firstEmployer.companySize || "N/A",
        contactName: firstEmployer.contactName || "N/A",
        phone: firstEmployer.phone || "N/A",
        aboutCompany: firstEmployer.aboutCompany || "N/A",
        imageUrl: firstEmployer.imageUrl || "N/A",
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("❗ Error fetching Employer details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to check if an employer can post a job
const canPostJob = async (employerId) => {
  try {
    const jobCount = await prisma.job.count({
      where: { employerId },
    });

    if (jobCount < 3) {
      return { allowed: true, message: "You can post a job for free." };
    }

    // Find employer's latest active package
    const employerPackage = await prisma.employerPackage.findFirst({
      where: { employerId },
      orderBy: { expiresAt: "desc" }, // Get the most recent package
      include: { package: true },
    });

    if (!employerPackage || new Date() > new Date(employerPackage.expiresAt)) {
      return {
        allowed: false,
        message:
          "You have reached the free job limit. Please purchase a package to post more jobs.",
      };
    }

    if (employerPackage.jobCount >= employerPackage.package.jobLimit) {
      return {
        allowed: false,
        message:
          "Job posting limit reached for your package. Please upgrade or renew your package.",
      };
    }

    return { allowed: true, message: "You can post a job under your package." };
  } catch (error) {
    console.error("Error checking job posting eligibility:", error);
    return {
      allowed: false,
      message: "Error checking job posting eligibility.",
    };
  }
};

// Controller for posting a job
const postJob = async (req, res) => {
  console.log("Decoded User ID:", req.userId); // Debugging log

  if (!req.userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized. User not found in request." });
  }

  try {
    // Ensure employer exists
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId }, // Match employer based on userId
    });

    if (!employer) {
      return res.status(404).json({ error: "Employer not found." });
    }

    const employerId = employer.id; // Get the employer's ID

    // Check if employer can post a job
    const permission = await canPostJob(employerId);
    if (!permission.allowed) {
      return res.status(403).json({ error: permission.message });
    }

    // Destructure job details from request body
    const {
      title,
      categoryId,
      description,
      applicationDeadline,
      requirement,
      jobLocation,
      jobType,
      salary,
      experience,
    } = req.body;

    // Create the job
    const job = await prisma.job.create({
      data: {
        title,
        categoryId,
        description,
        employerId, // Use the correct employer ID
        applicationDeadline,
        requirement,
        jobLocation,
        jobType,
        salary,
        experience,
      },
    });

    // Update employer's package job count if they have a package
    await prisma.employerPackage.updateMany({
      where: { employerId },
      data: { jobCount: { increment: 1 } },
    });

    res.status(201).json({ message: "Job posted successfully.", job });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Controller for purchasing a package
const purchasePackage = async (req, res) => {
  const employerId = req.user.id; // Extract employerId from verified token
  const { packageId } = req.body;

  try {
    const pricingPackage = await prisma.pricingPackage.findUnique({
      where: { id: packageId },
    });

    if (!pricingPackage) {
      return res.status(404).json({ error: "Package not found." });
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + pricingPackage.duration);

    await prisma.employerPackage.upsert({
      where: { employerId },
      update: { packageId, expiresAt, jobCount: 0 },
      create: { employerId, packageId, expiresAt, jobCount: 0 },
    });

    res.status(200).json({ message: "Package purchased successfully." });
  } catch (error) {
    console.error("Error purchasing package:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getJobsByEmployer = async (req, res) => {
  try {
    // Find employer based on the userId
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
    });

    if (!employer) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    console.log("Employer found:", employer); // Log employer details

    // Fetch jobs posted by the employer along with the count of applicants for each job
    const jobs = await prisma.job.findMany({
      where: { employerId: employer.id },
      include: {
        category: {
          // ✅ was jobCategory before, fixed now
          select: {
            name: true,
          },
        },
        // Count the number of applications (i.e., the number of applicants for each job)
        application: {
          select: {
            id: true, // Selecting the 'id' just to count the applications
          },
        },
      },
    });
    console.log("Jobs fetched:", jobs); // Log fetched jobs

    // Add the application count for each job
    const jobsWithApplicantCount = jobs.map((job) => ({
      ...job,
      applicantsCount: job.application.length, // Get the length of the application array to count applicants
    }));

    res.status(200).json(jobsWithApplicantCount); // Respond with jobs including the applicants count
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
    });

    if (!employer) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job || job.employerId !== employer.id) {
      return res
        .status(404)
        .json({ message: "Job not found or access denied" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Edit Job by ID
const editJobById = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    category,
    description,
    applicationDeadline,
    requirement,
    type,
    jobType,
    salary,
    experience,
  } = req.body;

  try {
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
    });

    if (!employer) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job || job.employerId !== employer.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to edit this job" });
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        category,
        description,
        applicationDeadline: applicationDeadline
          ? new Date(applicationDeadline)
          : null,
        requirement,
        type,
        jobType,
        salary: salary.toString(), // Ensure salary is a string
        experience,
      },
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
    });

    if (!employer) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job || job.employerId !== employer.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this job" });
    }

    await prisma.job.delete({
      where: { id },
    });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getPricingPackage = async (req, res) => {
  try {
    // Verify token and get the userId from the token
    const userId = req.userId; // Extract userId from the token payload

    // If you want to use employer information, you can do this:
    const employer = await prisma.employer.findUnique({
      where: { userId: userId },
    });

    if (!employer) {
      return res.status(404).json({ error: "Employer not found" });
    }

    // If you want to associate packages with employer, here is the fetched packages
    const packages = await prisma.pricingPackage.findMany();

    res.status(200).json({ packages, employerId: employer.id });
  } catch (error) {
    console.error("Error fetching pricing packages:", error);
    res.status(500).json({ error: "Failed to fetch pricing packages" });
  }
};

export {
  getEmployerProfile,
  createEmployerProfile,
  getCompanyDetails,
  updateEmployerProfile,
  postJob,
  purchasePackage,
  editJobById,
  getJobById,
  getJobsByEmployer,
  getPricingPackage,
  deleteJobById,
};
