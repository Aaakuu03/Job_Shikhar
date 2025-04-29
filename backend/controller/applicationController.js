import { PrismaClient } from "@prisma/client";
import { sendNotification } from "../middleware/sendNotification.js";
import nodemailer from "nodemailer"; // Make sure to install this

const prisma = new PrismaClient();

// Setup Nodemailer
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Change based on your email provider
    port: 587, // Use 465 for secure (SSL), 587 for STARTTLS
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your app-specific password
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log("🔍 Incoming request for job ID:", jobId);
    console.log("🔍 User ID from token:", req.userId);

    if (!req.userId || req.userType !== "EMPLOYER") {
      console.error("❌ Unauthorized access attempt");
      return res
        .status(401)
        .json({ error: "Unauthorized - Employer role required" });
    }

    // Fetch employer ID using userId
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId }, // ✅ Find employer based on userId
      select: { id: true }, // ✅ Get employer's ID
    });
    if (!employer) {
      console.error("❌ Employer record not found for userId:", req.userId);

      return res
        .status(403)
        .json({ message: "Forbidden - No employer record found" });
    }

    console.log("✅ Employer ID from DB:", employer.id);

    // Verify the employer owns the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { employerId: true }, // Fetch only employer ID
    });

    if (!job) {
      console.error("❌ Job not found for jobId:", jobId);

      return res.status(404).json({ message: "Job not found" });
    }

    console.log("✅ Job Employer ID:", job.employerId);

    // Now compare correctly
    if (job.employerId !== employer.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You don't own this job" });
    }
    // Fetch applications
    console.log("🔍 Fetching applications for job ID:", jobId);

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        jobSeeker: {
          include: {
            user: { select: { name: true, email: true, phoneNumber: true } },
            education: true,
            training: true,
            workExperience: true,
          },
        },
      },
    });

    if (applications.length === 0) {
      return res.status(200).json({ message: "No applications found" });
    }

    console.log("✅ Applications fetched:", applications.length);

    // Debugging: Log jobSeekerId
    applications.forEach((app) => {
      console.log(
        `🔍 Application ID: ${app.id}, jobSeekerId: ${
          app.jobSeekerId
        }, Found: ${app.jobSeeker ? "Yes" : "No"}`
      );
    });

    // Format response
    const formattedApplications = applications.map((app) => ({
      applicationId: app.id,
      status: app.status,
      appliedAt: app.appliedAt,
      jobSeeker: app.jobSeeker // ✅ Changed from "seeker" to "jobSeeker"
        ? {
            name: app.jobSeeker.user?.name || "N/A",
            email: app.jobSeeker.user?.email || "N/A",
            phone: app.jobSeeker.user?.phoneNumber || "N/A", // ✅ Fixed property name
            resumeUrl: app.jobSeeker.resumeUrl || "",
            education: app.jobSeeker.education || [],
            training: app.jobSeeker.training || [],
            experience: app.jobSeeker.workExperience || [], // ✅ Fixed property name
          }
        : null,
    }));

    res.status(200).json({ applications: formattedApplications });
  } catch (error) {
    console.error("🔥 Error fetching applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getApplication = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;

    console.log(
      `🔍 Fetching details for applicant ID: ${applicationId} in job ID: ${jobId}`
    );
    if (!jobId || !applicationId) {
      return res
        .status(400)
        .json({ error: "Job ID and Application ID are required" });
    }

    // Ensure user is an employer
    if (!req.userId || req.userType !== "EMPLOYER") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Employer role required" });
    }

    // Find employer by userId
    const employer = await prisma.employer.findUnique({
      where: { userId: req.userId },
      select: { id: true },
    });

    if (!employer) {
      return res
        .status(403)
        .json({ message: "Forbidden - No employer record found" });
    }

    // Ensure the employer owns the job
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      select: { employerId: true },
    });

    if (!job || job.employerId !== employer.id) {
      return res
        .status(403)
        .json({ message: "Forbidden - You don't own this job" });
    }

    // Fetch applicant details
    const application = await prisma.application.findFirst({
      where: { id: applicationId, jobId },
      include: {
        jobSeeker: {
          include: {
            user: { select: { name: true, email: true, phoneNumber: true } },
            education: true,
            training: true,
            workExperience: true,
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log("✅ Applicant details found");

    const formattedApplication = {
      applicationId: application.id,
      status: application.status,
      appliedAt: application.appliedAt,
      jobSeeker: application.jobSeeker
        ? {
            name: application.jobSeeker.user?.name || "N/A",
            email: application.jobSeeker.user?.email || "N/A",
            phone: application.jobSeeker.user?.phoneNumber || "N/A",
            resumeUrl: application.jobSeeker.resumeUrl || "",
            education: application.jobSeeker.education || [],
            training: application.jobSeeker.training || [],
            experience: application.jobSeeker.workExperience || [],
          }
        : null,
    };

    res.status(200).json(formattedApplication);
  } catch (error) {
    console.error("🔥 Error fetching applicant details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Allowed statuses
    const validStatuses = ["Pending", "Rejected", "Accepted"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status provided." });
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        job: true,
        jobSeeker: {
          include: {
            user: true, // 👈 Get name and email from user table
          },
        },
      },
    });

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    // Update the application status
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    const { job, jobSeeker } = application;
    const { user } = jobSeeker;

    if (status === "Accepted") {
      await sendNotification(
        jobSeeker.id,
        `🎉 Congratulations! Your application for the position of "${job.title}" has been accepted. The company will contact you via email or SMS for further details.`
      );

      await sendEmail(
        user.email,
        `Interview Opportunity for ${job.title}`,
        `Hello ${user.name},\n\nCongratulations! You have been shortlisted for the position of "${job.title}". The company will contact you soon via email or SMS with interview details.\n\nBest of luck!\n\n— Job Shikhar Team`
      );
    } else if (status === "Rejected") {
      await sendNotification(
        jobSeeker.id,
        `🙁 We regret to inform you that your application for "${job.title}" was not selected. Keep applying for other opportunities!`
      );
    }

    res.json({
      message: `Application status updated to ${status}.`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("🔥 Error updating application status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const statusNotification = async (req, res) => {
  const jobSeekerId = req.userId; // Assuming `req.user.id` holds the authenticated job seeker’s ID

  try {
    const notifications = await prisma.notification.findMany({
      where: { jobSeekerId },
      orderBy: { createdAt: "desc" },
    });

    res.json(notifications);
  } catch (error) {
    console.error("🔥 Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// PUT /notifications/:id/read
const readNotification = async (req, res) => {
  const { id } = req.params;

  const updatedNotification = await prisma.notification.update({
    where: { id: id },
    data: { read: true },
  });

  res.json(updatedNotification);
};

// PUT /notifications/mark-all-read/:userId
const readAllNotification = async (req, res) => {
  const { userId } = req.params;

  await prisma.notification.updateMany({
    where: { userId: userId, read: false },
    data: { read: true },
  });

  res.json({ message: "All notifications marked as read" });
};

export {
  getApplicantsForJob,
  getApplication,
  updateApplicationStatus,
  statusNotification,
  readAllNotification,
  readNotification,
};
