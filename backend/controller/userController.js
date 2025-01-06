import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

//Jobseeker Login
const jobSeekerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.userType !== "JOBSEEKER") {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      })
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "User not found", error: error.message });
  }
};

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
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not created." });
    }
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "User not created", error: error.message });
  }
};

//Staff Login
const employerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.findUnique({
      where: {
        email,
        userType: "EMPLOYER",
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Employer not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      })
      .json({ message: "Staff logged in successfully", user, token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Staff not found", error: error.message });
  }
};

//Employer Register
const employerRegister = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !password || !phone || !email) {
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
    existingUser = await prisma.user.findUnique({
      where: { phoneNumber: phone },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Phone number is already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber: phone,
        password: hashedPassword,
        userType: "EMPLOYER",
      },
    });
    if (!user) {
      return res.status(400).json({ message: "Staff not created." });
    }
    return res
      .status(201)
      .json({ message: "Staff account created successfully", user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Staff account not created", error: error.message });
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
  jobSeekerLogin,
  jobSeekerRegister,
  employerLogin,
  employerRegister,
  adminLogin,
  adminRegister,
};
