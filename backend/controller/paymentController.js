import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";
import streamBuffers from "stream-buffers";
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

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return { success: false, error };
  }
};

export const initiatePayment = async (req, res) => {
  try {
    const { packageId, employerId } = req.body;
    console.log(employerId);
    // Retrieve the selected pricing package from the database
    const selectedPackage = await prisma.pricingPackage.findUnique({
      where: { id: packageId },
    });

    if (!selectedPackage) {
      return res.status(400).json({ error: "Package not found" });
    }

    const transaction_uuid = uuidv4();
    const tax_amount = 0; // Example tax amount
    const product_service_charge = 0; // Example service charge
    const product_delivery_charge = 0; // Example delivery charge
    const total_amount =
      selectedPackage.price +
      tax_amount +
      product_service_charge +
      product_delivery_charge;

    const product_code = "EPAYTEST"; // Example product code

    // Create the message for hashing
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const secret_key = "8gBm/:&EnhH.1/q"; // Replace with your actual secret key
    const hash = CryptoJS.HmacSHA256(message, secret_key);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    const success_url = `http://localhost:3000/employer/payment/success?transaction_uuid=${transaction_uuid}&employerId=${employerId}&packageId=${packageId}`;
    const failure_url = `http://localhost:3000/employer/payment/failure`;

    res.json({
      amount: selectedPackage.price,
      tax_amount,
      total_amount,
      transaction_uuid,
      product_code,
      product_service_charge,
      product_delivery_charge,
      success_url,
      failure_url,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: hashInBase64,
      employerId,
      packageId,
    });
  } catch (error) {
    console.error("Initiate Payment Error:", error);
    res.status(500).json({ error: "Error initiating payment" });
  }
};

// export const handleSuccess = async (req, res) => {
//   try {
//     const { transaction_uuid, employerId, packageId } = req.query;

//     // Retrieve the selected pricing package from the database
//     const selectedPackage = await prisma.pricingPackage.findUnique({
//       where: { id: packageId },
//     });

//     if (!selectedPackage) {
//       return res.status(400).json({ error: "Package not found" });
//     }

//     const expiresAt = new Date();
//     expiresAt.setDate(expiresAt.getDate() + selectedPackage.duration); // Add duration to current date

//     // Create or update the EmployerPackage
//     await prisma.employerPackage.upsert({
//       where: { employerId: employerId },
//       update: {
//         packageId: packageId,
//         expiresAt,
//         jobCount: 0, // Reset job count after package purchase
//       },
//       create: {
//         employerId: employerId,
//         packageId: packageId,
//         expiresAt,
//         jobCount: 0,
//       },
//     });

//     // Redirect to success page
//     res.redirect(
//       `http://localhost:3000/employer/payment/success?transaction_uuid=${transaction_uuid}&employerId=${employerId}&packageId=${packageId}`
//     );
//   } catch (error) {
//     console.error("Handle Success Error:", error);
//     res.redirect("http://localhost:3000/employer/payment/failure");
//   }
// };

// export const handleSuccess = async (req, res) => {
//   try {
//     let { transaction_uuid, employerId, packageId } = req.query;
//     console.log("Incoming Params:", req.query);

//     // 🔧 Fix polluted packageId (e.g., ?data=...)
//     if (typeof packageId === "string" && packageId.includes("?")) {
//       packageId = packageId.split("?")[0];
//       console.log("✅ Cleaned packageId:", packageId);
//     }

//     // Validate all required parameters
//     if (!transaction_uuid || !employerId || !packageId) {
//       return res.status(400).json({ error: "Missing parameters." });
//     }

//     // Find employer
//     const employer = await prisma.employer.findUnique({
//       where: { id: employerId },
//     });

//     if (!employer) {
//       return res.status(404).json({ error: "Employer not found." });
//     }

//     // Fetch selected package
//     const selectedPackage = await prisma.pricingPackage.findUnique({
//       where: { id: packageId },
//     });

//     if (!selectedPackage) {
//       return res.status(400).json({ error: "Package not found." });
//     }

//     // Set expiration date
//     const expiresAt = new Date();
//     expiresAt.setDate(expiresAt.getDate() + selectedPackage.duration);

//     // Upsert employer package
//     await prisma.employerPackage.upsert({
//       where: { employerId },
//       update: {
//         packageId,
//         expiresAt,
//         jobCount: 0,
//       },
//       create: {
//         employerId,
//         packageId,
//         expiresAt,
//         jobCount: 0,
//       },
//     });

//     console.log("✅ Employer package updated successfully.");

//     res.redirect(
//       `http://localhost:3000/employer/payment/success?transaction_uuid=${transaction_uuid}&employerId=${employerId}&packageId=${packageId}`
//     );
//   } catch (error) {
//     console.error("❌ Handle Success Error:", error);
//     res.redirect("http://localhost:3000/employer/payment/failure");
//   }
// };

export const handleSuccess = async (req, res) => {
  try {
    let { transaction_uuid, employerId, packageId } = req.query;
    console.log("Incoming Params:", req.query);

    // 🔧 Clean polluted packageId (if contains extra query data)
    if (typeof packageId === "string" && packageId.includes("?")) {
      packageId = packageId.split("?")[0];
      console.log("✅ Cleaned packageId:", packageId);
    }

    // Validate required parameters
    if (!transaction_uuid || !employerId || !packageId) {
      return res.status(400).json({ error: "Missing parameters." });
    }

    // Check if employer exists
    const employer = await prisma.employer.findUnique({
      where: { id: employerId },
      include: { user: true }, // Include user to get email
    });

    if (!employer || !employer.user) {
      return res.status(404).json({ error: "Employer or user not found." });
    }

    // Fetch selected package
    const selectedPackage = await prisma.pricingPackage.findUnique({
      where: { id: packageId },
    });

    if (!selectedPackage) {
      return res.status(400).json({ error: "Package not found." });
    }

    // Set expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + selectedPackage.duration);

    // Upsert employer package
    const employerPackage = await prisma.employerPackage.upsert({
      where: { employerId },
      update: {
        packageId,
        expiresAt,
        jobCount: 0,
      },
      create: {
        employerId,
        packageId,
        expiresAt,
        jobCount: 0,
      },
    });

    console.log("✅ Employer package updated successfully.");

    // 💡 Check for existing payment with the same transactionId
    const existingPayment = await prisma.payment.findUnique({
      where: { transactionId: transaction_uuid },
    });

    if (existingPayment) {
      console.log("⚠️ Duplicate payment detected. Skipping creation.");
      return res.redirect(
        `http://localhost:3000/employer/payment/success?transaction_uuid=${transaction_uuid}&employerId=${employerId}&packageId=${packageId}`
      );
    }

    // 💳 Create Payment record safely (handle race condition)
    try {
      await prisma.payment.create({
        data: {
          employerId,
          packageId,
          amount: selectedPackage.price,
          method: "Esewa", // or dynamically determine
          status: "success",
          transactionId: transaction_uuid,
          employerPackageId: employerPackage.id,
        },
      });
      console.log("💰 Payment record created successfully.");
    } catch (err) {
      if (err.code === "P2002") {
        console.warn("⚠️ Unique constraint: Payment already exists.");
      } else {
        throw err;
      }
    }
    // ✉️ Send email to employer's user
    try {
      const subject = "Payment Successful - Package Activated";
      const text =
        `Hello ${employer.user?.name || "Employer"},\n\n` +
        `Thank you for your payment. Your package "${selectedPackage.name}" has been successfully activated.\n\n` +
        `Transaction ID: ${transaction_uuid}\n` +
        `Amount: ${selectedPackage.price}\n` +
        `Expires At: ${expiresAt.toDateString()}\n\n` +
        `Regards,\nJob Shikhar Team`;

      await sendEmail(employer.user.email, subject, text);
      console.log("📧 Email sent to:", employer.user.email);
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);
    }

    res.redirect(
      `http://localhost:3000/employer/payment/success?transaction_uuid=${transaction_uuid}&employerId=${employerId}&packageId=${packageId}`
    );
  } catch (error) {
    console.error("❌ Handle Success Error:", error);
    res.redirect("http://localhost:3000/employer/payment/failure");
  }
};

export const handleFailure = (req, res) => {
  res.redirect("http://localhost:3000/employer/payment/failure");
};

export const getPaymentSuccessDetails = async (req, res) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res.status(400).json({ error: "Missing transaction ID." });
    }

    const payment = await prisma.payment.findUnique({
      where: {
        transactionId: transactionId,
      },
      include: {
        employer: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        package: true,
        employerPackage: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found." });
    }

    const responseData = {
      transactionId: payment.transactionId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      createdAt: payment.createdAt,

      employer: {
        id: payment.employer.id,
        name: payment.employer.user?.name,
        email: payment.employer.user?.email,
      },

      package: {
        id: payment.package.id,
        name: payment.package.name,
        price: payment.package.price,
        duration: payment.package.duration,
        jobLimit: payment.package.jobLimit,
        description: payment.package.description,
      },

      employerPackage: payment.employerPackage
        ? {
            id: payment.employerPackage.id,
            expiresAt: payment.employerPackage.expiresAt,
            jobCount: payment.employerPackage.jobCount,
          }
        : null,
    };

    res.json(responseData);
  } catch (error) {
    console.error("❌ Error fetching payment details:", error);
    res
      .status(500)
      .json({ error: "Server error while retrieving payment details." });
  }
};

export const downloadReceipt = async (req, res) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res.status(400).json({ error: "Missing transaction ID." });
    }

    const payment = await prisma.payment.findUnique({
      where: { transactionId },
      include: {
        employer: { include: { user: true } },
        package: true,
        employerPackage: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found." });
    }

    const doc = new PDFDocument();
    const buffer = new streamBuffers.WritableStreamBuffer();

    doc.pipe(buffer);

    // Header
    doc.fontSize(20).text("📄 Payment Receipt", { align: "center" });
    doc.moveDown();

    // Transaction Info
    doc.fontSize(12).text(`Transaction ID: ${payment.transactionId}`);
    doc.text(`Date: ${new Date(payment.createdAt).toLocaleString()}`);
    doc.text(`Status: ${payment.status}`);
    doc.text(`Method: ${payment.method}`);
    doc.text(`Amount Paid: $${payment.amount}`);
    doc.moveDown();

    // Employer Info
    doc.text(`Employer: ${payment.employer.user?.name}`);
    doc.text(`Email: ${payment.employer.user?.email}`);
    doc.moveDown();

    // Package Info
    doc.text(`Package: ${payment.package.name}`);
    doc.text(`Duration: ${payment.package.duration} days`);
    doc.text(`Job Limit: ${payment.package.jobLimit}`);
    doc.text(
      `Expires At: ${new Date(
        payment.employerPackage?.expiresAt
      ).toDateString()}`
    );
    doc.text(`Description: ${payment.package.description || "N/A"}`);
    doc.moveDown();

    doc.text("Thank you for your payment!", { align: "center" });

    doc.end();

    buffer.on("finish", () => {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=receipt_${transactionId}.pdf`
      );
      res.send(buffer.getContents());
    });
  } catch (err) {
    console.error("❌ Error generating receipt:", err);
    res.status(500).json({ error: "Failed to generate receipt." });
  }
};
