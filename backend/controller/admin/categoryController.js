import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createCategory = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { name } = req.body;
  try {
    const category = await prisma.jobCategory.create({ data: { name } });
    res.status(201).json(category);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Category already exists or invalid input." });
  }
};

export const getCategory = async (req, res) => {
  try {
    const categories = await prisma.jobCategory.findMany();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

export const updateCategory = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await prisma.jobCategory.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: "Category not found or update failed." });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  if (!req.adminId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const { id } = req.params;
  try {
    await prisma.jobCategory.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: "Category not found or delete failed." });
  }
};
