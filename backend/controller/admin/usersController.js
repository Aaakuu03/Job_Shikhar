import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listUsers = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const users = await prisma.user.findMany({
      include: {
        jobSeeker: {
          include: {
            education: true,
            training: true,
            workExperience: true,
            notifications: true,
          },
        },
        employer: {
          include: {
            job: true,
            employerPackage: {
              include: {
                package: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUsers = users.map((user) => {
      const commonData = {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        isFormFilled: user.isFormFilled,
      };

      if (user.userType === "JOBSEEKER") {
        return {
          ...commonData,
          profile: user.jobSeeker,
        };
      } else if (user.userType === "EMPLOYER") {
        return {
          ...commonData,
          company: user.employer,
        };
      } else {
        return commonData;
      }
    });

    res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while listing users." });
  }
};

const adminDeleteUser = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { id } = req.params;

  try {
    // Delete tokens
    await prisma.token.deleteMany({ where: { userId: id } });

    // Delete JobSeeker details if applicable
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: id },
    });
    if (jobSeeker) {
      await prisma.notification.deleteMany({
        where: { jobSeekerId: jobSeeker.id },
      });
      await prisma.training.deleteMany({
        where: { jobSeekerId: jobSeeker.id },
      });
      await prisma.education.deleteMany({
        where: { jobSeekerId: jobSeeker.id },
      });
      await prisma.workExperience.deleteMany({
        where: { jobSeekerId: jobSeeker.id },
      });
      await prisma.application.deleteMany({
        where: { jobSeekerId: jobSeeker.id },
      });
      await prisma.jobSeeker.delete({ where: { userId: id } });
    }

    // Delete Employer details if applicable
    const employer = await prisma.employer.findUnique({
      where: { userId: id },
    });
    if (employer) {
      await prisma.application.deleteMany({
        where: {
          job: {
            employerId: employer.id,
          },
        },
      });
      await prisma.job.deleteMany({ where: { employerId: employer.id } });
      await prisma.employerPackage.deleteMany({
        where: { employerId: employer.id },
      });
      await prisma.employer.delete({ where: { userId: id } });
    }

    // Finally, delete the user
    await prisma.user.delete({ where: { id } });

    res
      .status(200)
      .json({ message: "User and associated data deleted successfully." });
  } catch (error) {
    console.error("Delete user failed:", error);
    res.status(500).json({ error: "Error deleting user." });
  }
};

export const jobLogList = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        employer: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phoneNumber: true,
              },
            },
          },
        },
        category: {
          // Include the category details
          select: {
            name: true, // Select the category name
          },
        },
        _count: {
          select: {
            application: true, // Get the total count of applications
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      requirement: job.requirement,
      jobLocation: job.jobLocation,
      experience: job.experience,
      salary: job.salary,
      category: job.category?.name || "", // Access the category name
      jobType: job.jobType,
      deadline: job.applicationDeadline,
      createdAt: job.createdAt,
      //   totalApplications: job.application.length,
      applicationCount: job._count.application, // Add the application count

      // Employer / Company Details
      companyName: job.employer?.user?.name || "",
      companyEmail: job.employer?.user?.email || "",
      companyPhone: job.employer?.user?.phoneNumber || "",
      industry: job.employer?.industryType || "",
      companySize: job.employer?.companySize || "",
      contactName: job.employer?.contactName || "",
      aboutCompany: job.employer?.aboutCompany || "",
      address: job.employer?.address || "",
    }));

    res.status(200).json(formattedJobs);
  } catch (error) {
    console.error("Error fetching job logs:", error);
    res.status(500).json({ error: "Failed to fetch job logs." });
  }
};

export { listUsers, adminDeleteUser };
