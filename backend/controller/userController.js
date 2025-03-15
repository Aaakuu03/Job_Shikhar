import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

const prisma = new PrismaClient();
dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const secret = process.env.SECRET_KEY || "fallback_secret";

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Change based on your email provider
  port: 587, // Use 465 for secure (SSL), 587 for STARTTLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app-specific password
  },
});

//jobseeker Register
const jobSeekerRegister = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  if (!name || !password || !phoneNumber || !email) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
  try {
    // Check if the email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Check if the phone number already exists
    let existingPhoneUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingPhoneUser) {
      return res
        .status(400)
        .json({ message: "Phone number is already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        verificationToken,
      },
    });

    // Prepare verification email
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Click on this link to verify your email: ${verificationLink}`,
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Registration successful! Check your email for verification.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType,
        },
        token,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.params; // Extract token from the URL

  console.log("Received token:", token); // Log the received token for debugging
  try {
    // Find the user by verificationToken
    const matchingUser = await prisma.user.findFirst({
      where: {
        verificationToken: token, // Look for the user with the given token
        isVerified: false, // Ensure they are not already verified
      },
    });

    if (!matchingUser) {
      console.log("No matching user found.");
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    console.log("Matching user found:", matchingUser);

    // Update user as verified
    const user = await prisma.user.update({
      where: { id: matchingUser.id },
      data: { isVerified: true, verificationToken: null },
    });

    console.log("User verified successfully:", user);
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error during verification:", error);
    res
      .status(500)
      .json({ message: "Verification failed. Please try again later." });
  }
};

//Send Reset Password Email
const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Set expiry time to 1 hour from now (in milliseconds)
    // Save token to the database
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: resetTokenExpiry, // Pass Date object
      },
    });

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetURL}">${resetURL}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Failed to send password reset email." });
  }
};

// Reset Password
//reset the password
const resetPassword = async (req, res) => {
  const { newPassword } = req.body; // Extract new password from the request body
  const { token } = req.params; // Extract token from the request parameters

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  try {
    // Hash the token from the request
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // Get the current time as a Date object
    const currentDateTime = new Date();

    // Find the user with the matching reset token and valid expiry time
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: {
          gt: currentDateTime, // Ensure token has not expired
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    // Find user with role check
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.userType },
      secret,
      {
        expiresIn: "6h",
      }
    );

    // Store the token in the database (optional)
    await prisma.token.create({
      data: {
        token: token,
        userId: user.id,
      },
    });

    // Determine redirect URL
    let redirectUrl;
    if (!user.isFormFilled) {
      redirectUrl =
        user.userType === "JOBSEEKER"
          ? "/jobseeker/fill-form"
          : "/employer/fill-form";
    } else if (user.userType === "JOBSEEKER") {
      redirectUrl = "/jobseeker/dashboard";
    } else if (user.userType === "EMPLOYER") {
      redirectUrl = "/employer/dashboard";
    } else {
      return res.status(400).json({ message: "Invalid user type." });
    }
    // Set cookie & send response

    res.cookie("jwt", token, {
      httpOnly: true, // Secures cookie against XSS
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "Strict", // CSRF protection
      maxAge: 6 * 60 * 60 * 1000, // 6 hours
    });
    console.log("Generated JWT:", token);
    return res.status(200).json({
      message: "User logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        jobSeekerId: user.jobSeeker?.id || null, // Include jobSeekerId if available
      },
      redirectUrl,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

//Employer Register
const employerRegister = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;
  if (!name || !password || !phoneNumber || !email) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
  try {
    // Check if the email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Check if the phone number already exists
    let existingPhoneUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (existingPhoneUser) {
      return res
        .status(400)
        .json({ message: "Phone number is already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        verificationToken,
        userType: "EMPLOYER",
      },
    });

    // Prepare verification email
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Click on this link to verify your email: ${verificationLink}`,
    });

    // Create JWT token (use environment variable for secret)
    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });

    // Send response with token and user info
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production", // Set secure cookie in production
      })
      .json({
        message: "Registration successful! Check your email for verification",
        user,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
//Admin Login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ admin }, "casdkjfqheiru23", { expiresIn: "1h" });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      })
      .json({ message: "Admin logged in successfully", admin, token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Admin not found", error: error.message });
  }
};

//Admin Register
const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!admin) {
      return res.status(400).json({ message: "Admin not created." });
    }
    return res
      .status(201)
      .json({ message: "Admin created successfully", admin });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Admin not created", error: error.message });
  }
};

export {
  userLogin,
  jobSeekerRegister,
  employerRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
  adminLogin,
  adminRegister,
};
