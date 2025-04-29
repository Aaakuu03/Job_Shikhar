import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createPackage = async (req, res) => {
  try {
    let { name, price, jobLimit, duration, description } = req.body;

    // Validate required fields
    if (
      !name ||
      price === undefined ||
      jobLimit === undefined ||
      duration === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert to correct data types
    price = parseFloat(price);
    jobLimit = parseInt(jobLimit);
    duration = parseInt(duration);

    if (isNaN(price) || isNaN(jobLimit) || isNaN(duration)) {
      return res.status(400).json({ message: "Invalid numeric values" });
    }

    const newPackage = await prisma.pricingPackage.create({
      data: {
        name,
        price,
        jobLimit,
        duration,
        description,
      },
    });

    res.status(201).json(newPackage);
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Route to get all pricing packages
export const getPackage = async (req, res) => {
  try {
    const packages = await prisma.pricingPackage.findMany();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pricing packages" });
  }
};

// Route to update a pricing package
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    let { name, price, jobLimit, duration, description } = req.body;

    const existingPackage = await prisma.pricingPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      return res.status(404).json({ message: "Pricing package not found" });
    }

    // Convert to correct types
    price = parseFloat(price);
    jobLimit = parseInt(jobLimit);
    duration = parseInt(duration);

    if (isNaN(price) || isNaN(jobLimit) || isNaN(duration)) {
      return res.status(400).json({ message: "Invalid numeric values" });
    }

    const updatedPackage = await prisma.pricingPackage.update({
      where: { id },
      data: { name, price, jobLimit, duration, description },
    });

    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

// Route to delete a pricing package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the package by ID
    const existingPackage = await prisma.pricingPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      return res.status(404).json({ message: "Pricing package not found" });
    }

    // Delete the package
    await prisma.pricingPackage.delete({
      where: { id },
    });

    res.status(200).json({ message: "Pricing package removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again" });
  }
};
