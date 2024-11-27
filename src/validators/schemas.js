const { z } = require("zod");

const authSchemas = {
  register: z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
  }),

  login: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  }),
};

const feedSchemas = {
  create: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters"),
    content: z
      .string()
      .min(1, "Content is required")
      .max(5000, "Content must be less than 5000 characters"),
  }),

  update: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be less than 100 characters")
      .optional(),
    content: z
      .string()
      .min(1, "Content is required")
      .max(5000, "Content must be less than 5000 characters")
      .optional(),
  }),

  id: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
};

const userSchemas = {
  updateRole: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
    role: z.enum(["user", "moderator", "admin"], {
      errorMap: () => ({ message: "Invalid role" }),
    }),
  }),
};

module.exports = {
  authSchemas,
  feedSchemas,
  userSchemas,
};
