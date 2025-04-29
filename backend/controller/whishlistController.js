import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addToWishlist = async (req, res) => {
  console.log("✅ Route Hit! Adding job to wishlist");

  try {
    const { jobId } = req.body;
    const userId = req.userId;
    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    // Get the job seeker linked to this user
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId }, // Assuming userId is unique in JobSeeker
    });

    if (!jobSeeker) {
      return res.status(403).json({ message: "User is not a Job Seeker" });
    }

    // Check if the job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the job is already in the wishlist
    const existingWishlistItem = await prisma.wishlist.findFirst({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    if (existingWishlistItem) {
      return res
        .status(400)
        .json({ message: "Job is already in the wishlist" });
    }

    // Add the job to the wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId,
        jobId,
        jobSeekerId: jobSeeker.id, // ✅ this fixes the FK issue
      },
    });

    return res
      .status(201)
      .json({ message: "Job added to wishlist", data: wishlistItem });
  } catch (error) {
    console.error("❌ Error in addToWishlist:", error);
    return res.status(500).json({ message: "Error adding job to wishlist" });
  }
};
const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId },
    });

    if (!jobSeeker) {
      return res.status(403).json({ message: "User is not a Job Seeker" });
    }

    // Fetch the wishlist with job details and employer details
    const wishlist = await prisma.wishlist.findMany({
      where: {
        jobSeekerId: jobSeeker.id,
      },
      include: {
        job: {
          include: {
            employer: true, // Include employer details
          },
        },
      },
    });

    return res.status(200).json({ data: wishlist });
  } catch (error) {
    console.error("❌ Error fetching wishlist:", error);
    return res.status(500).json({ message: "Error fetching wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { jobId } = req.params; // assuming jobId is passed as a URL param

    if (!userId) {
      return res.status(401).json({ message: "User is not logged in" });
    }

    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId },
    });

    if (!jobSeeker) {
      return res.status(403).json({ message: "User is not a Job Seeker" });
    }

    // Find the wishlist item first
    const wishlistItem = await prisma.wishlist.findFirst({
      where: {
        jobSeekerId: jobSeeker.id,
        jobId: jobId,
      },
    });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    await prisma.wishlist.delete({
      where: {
        id: wishlistItem.id,
      },
    });

    return res.status(200).json({ message: "Wishlist item removed" });
  } catch (error) {
    console.error("❌ Error deleting wishlist item:", error);
    return res.status(500).json({ message: "Error deleting wishlist item" });
  }
};

export { addToWishlist, getWishlist, removeFromWishlist };
