import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFilteredJobs = async (req, res) => {
  const { employmentType, industryType, jobLocation } = req.query;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        ...(employmentType && { jobType: employmentType }),
        ...(industryType && {
          employer: {
            is: {
              industryType: industryType,
            },
          },
        }),
        ...(jobLocation && {
          jobLocation: {
            contains: jobLocation,
          },
        }),
      },
      include: {
        employer: {
          include: {
            user: true, // Include the user details linked to employer
          },
        },
      },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};
export { getFilteredJobs };
