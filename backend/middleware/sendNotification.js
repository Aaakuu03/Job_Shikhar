import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const sendNotification = async (jobSeekerId, message) => {
  try {
    // Store the notification in the database
    await prisma.notification.create({
      data: {
        jobSeekerId,
        message,
        read: false, // Mark as unread
      },
    });

    console.log(
      `📩 Notification sent to Job Seeker (${jobSeekerId}): ${message}`
    );
    return true;
  } catch (error) {
    console.error("🔥 Error sending notification:", error);
    return false;
  }
};

export { sendNotification };
