import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const applyForJob = async (req, res) => {
  try {
    console.log("Request received. Checking req.user:", req.userId);

    if (!req.userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized - Please log in to apply for a job" });
    }

    const { jobId } = req.body;
    const userId = req.userId;

    // Fetch jobSeeker using userId (FK in JobSeeker table)
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: userId },
      include: {
        user: { select: { name: true, email: true, phoneNumber: true } }, // Get user details
        education: true,
        training: true,
        workExperience: true,
      },
    });

    if (!jobSeeker) {
      return res.status(404).json({ error: "Job seeker profile not found" });
    }

    const jobSeekerId = jobSeeker.id; // Fetch jobSeekerId from JobSeeker

    // Validate Profile Completion
    if (!jobSeeker.skills || !jobSeeker.jobType || !jobSeeker.salaryType) {
      return res
        .status(400)
        .json({ error: "Profile is incomplete. Update profile." });
    }

    // Validate Education
    if (jobSeeker.education.length === 0) {
      return res
        .status(400)
        .json({ error: "Education is incomplete. Update education." });
    }

    // Validate Training
    if (jobSeeker.training.length === 0) {
      return res
        .status(400)
        .json({ error: "Training is incomplete. Update training." });
    }

    // Validate Work Experience
    if (jobSeeker.workExperience.length === 0) {
      return res.status(400).json({
        error: "Work experience is incomplete. Update work experience.",
      });
    }

    // Check if Job Exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { applicationDeadline: true },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the deadline has passed
    const currentDate = new Date();
    if (
      job.applicationDeadline &&
      new Date(job.applicationDeadline) < currentDate
    ) {
      return res
        .status(400)
        .json({ error: "The application deadline has passed." });
    }

    // Prevent duplicate applications for the same job
    const existingApplication = await prisma.application.findFirst({
      where: { jobId, jobSeekerId },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Create a new application
    const application = await prisma.application.create({
      data: { jobId, jobSeekerId, status: "Pending" },
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application: application,
      jobSeekerProfile: {
        name: jobSeeker.user.name,
        email: jobSeeker.user.email,
        phone: jobSeeker.user.phone,
        resumeUrl: jobSeeker.resumeUrl,
        education: jobSeeker.education,
        training: jobSeeker.training,
        experience: jobSeeker.experience,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    console.log("Fetching jobs from the database...");

    const jobs = await prisma.job.findMany({
      distinct: ["id"], // Ensuring uniqueness
      include: {
        employer: {
          include: {
            user: true, // Fetch related user info (company name, logo, etc.)
          },
        },
      },
    });

    console.log("Jobs Fetched:", jobs.length);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Error retrieving jobs");
  }
};

const getJobDetailsById = async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        employer: {
          include: {
            user: true, // Fetch user details from User table
          },
        },
        category: {
          // ✅ was jobCategory before, fixed now
          select: {
            name: true,
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get applied jobs for a specific job seeker using userId
const getAppliedJobDeatilsById = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing in request" });
  }

  try {
    // Find JobSeeker ID from userId
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    // Fetch applied jobs from Application table and include job details
    const appliedJobs = await prisma.application.findMany({
      where: { jobSeekerId: jobSeeker.id },
      include: {
        job: {
          include: {
            employer: {
              include: {
                user: true, // includes user info from employer.userId FK
              },
            },
          },
        },
      },
    });

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAppliedJobCount = async (req, res) => {
  const userId = req.userId;
  console.log("Received User ID:", userId); // ✅ Debugging
  if (!userId) {
    return res.status(400).json({ message: "User ID is missing in request" });
  }
  try {
    // Find the job seeker by the userId, including applications
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: {
        userId: userId, // Find job seeker based on userId
      },
      include: {
        application: true, // Include applications to count them
        wishlist: true,
      },
    });

    if (!jobSeeker) {
      return res.status(404).json({ message: "Job seeker not found" });
    }

    // Count the number of applications (i.e., the applied jobs)
    const appliedJobsCount = jobSeeker.application
      ? jobSeeker.application.length
      : 0;

    // Count the number of applications (i.e., the applied jobs)
    const savedJobsCount = jobSeeker.wishlist ? jobSeeker.wishlist.length : 0;

    // Get number of pending applications
    const pendingApplicationsCount = await prisma.application.count({
      where: {
        jobSeeker: {
          userId: userId,
        },
        status: "Pending", // Only count applications that are pending
      },
    });

    return res.status(200).json({
      appliedJobsCount,
      pendingApplicationsCount,
      savedJobsCount,
    });
  } catch (error) {
    console.error("Error fetching applied job count:", error);
    return res
      .status(500)
      .json({ message: "Could not retrieve applied job count" });
  }
};

const getPostedJobStats = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is missing in request" });
  }

  try {
    // Find the employer by userId, including their jobs and applications
    const employer = await prisma.employer.findUnique({
      where: {
        userId: userId,
      },
      include: {
        job: {
          include: {
            application: true, // Include applications for each job
          },
        },
      },
    });

    // Debugging: Log the employer data to see if it's being returned correctly
    console.log("Employer data:", employer);

    if (!employer || !employer.job) {
      return res.status(404).json({ message: "Employer or jobs not found" });
    }

    // Total number of jobs posted
    const totalJobsPosted = employer.job.length;

    // Total number of applicants (across all jobs)
    const totalApplicants = employer.job.reduce((acc, job) => {
      return acc + (job.application ? job.application.length : 0); // Count applications for each job
    }, 0);

    // Count the number of active jobs (those that are open and have a future deadline)
    const activeJobsCount = await prisma.job.count({
      where: {
        employerId: employer.id,
        applicationDeadline: {
          gte: new Date(), // Only jobs that have a deadline in the future
        },
      },
    });

    return res.status(200).json({
      totalJobsPosted,
      totalApplicants,
      activeJobsCount,
    });
  } catch (error) {
    console.error("Error fetching job stats:", error);
    return res.status(500).json({ message: "Could not retrieve job stats" });
  }
};

const getJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    // Sanitize category value (allow spaces, hyphens, and alphanumeric characters)
    const sanitizedCategory = category.replace(/[^a-zA-Z0-9_\- ]/g, "");

    // Fetch the category from the JobCategory table using the category name
    const categoryRecord = await prisma.jobCategory.findUnique({
      where: { name: sanitizedCategory }, // Ensure this matches your DB column name
    });

    // Check if the category exists
    if (!categoryRecord) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Fetch jobs associated with this categoryId
    const jobs = await prisma.job.findMany({
      where: {
        categoryId: categoryRecord.id, // Use categoryId to fetch jobs
      },
      include: {
        employer: {
          include: {
            user: true, // Include the user details linked to employer
          },
        },
        jobSeeker: true, // Include job seeker details (if needed)
      },
    });

    // Return an empty array with a 200 status if no jobs are found
    if (jobs.length === 0) {
      return res.status(200).json([]); // Return empty array, not 404
    }

    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs by category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getJobsByIndustry = async (req, res) => {
  try {
    const { industry } = req.params;

    if (!industry) {
      return res.status(400).json({ error: "Industry type is required" });
    }

    // Sanitize and format the industryType input
    const sanitizedIndustry = industry.replace(/[^a-zA-Z0-9_]/g, "");
    const formattedIndustry = sanitizedIndustry.toUpperCase(); // Assuming your ENUMs are uppercase
    // Count the number of jobs in the specified industry
    const jobCount = await prisma.job.count({
      where: {
        employer: {
          industryType: formattedIndustry,
        },
      },
    });

    if (jobCount === 0) {
      return res.status(200).json([]); // Always return an array
    }

    const jobs = await prisma.job.findMany({
      where: {
        employer: {
          industryType: formattedIndustry,
        },
      },
      include: {
        employer: {
          include: {
            user: true, // Include the user details linked to employer
          },
        },
      },
    });
    // if (jobs.length === 0) {
    //   return res.status(200).json([]); // Return empty array, not 404
    // }

    res.json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs by industry type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllJobListing = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // default 10 jobs per page
    const skip = (page - 1) * limit;

    // Get employmentType from the query and normalize it to uppercase
    const employmentType = req.query.employmentType
      ? req.query.employmentType.toUpperCase() // Normalize to uppercase
      : "ALL";

    // List of valid EmploymentType enum values
    const validEmploymentTypes = [
      "FULL_TIME",
      "PART_TIME",
      "CONTRACT",
      "INTERNSHIP",
      "FREELANCE",
      "TEMPORARY",
    ];

    // Check if the provided employmentType is valid
    if (
      employmentType !== "ALL" &&
      !validEmploymentTypes.includes(employmentType)
    ) {
      return res.status(400).json({ message: "Invalid employment type." });
    }

    // Build the filter object
    const filter = employmentType !== "ALL" ? { jobType: employmentType } : {};

    // Fetch jobs with employment type filter if it's not "ALL"
    const [jobs, totalJobs] = await Promise.all([
      prisma.job.findMany({
        where: filter, // Apply the filter to the query
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        distinct: ["id"], // Ensure uniqueness
        include: {
          employer: {
            include: {
              user: true, // Fetch related user info (company name, logo, etc.)
            },
          },
        },
      }),
      prisma.job.count({
        where: filter, // Apply the filter to count query
      }),
    ]);

    const totalPages = Math.ceil(totalJobs / limit);

    res.status(200).json({
      jobs,
      totalJobs,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

export {
  applyForJob,
  getAllJobs,
  getJobDetailsById,
  getAppliedJobDeatilsById,
  getAppliedJobCount,
  getPostedJobStats,
  getJobsByCategory,
  getJobsByIndustry,
};
