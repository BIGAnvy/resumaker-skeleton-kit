
import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;

// Contact information schema
export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(phoneRegex, { message: "Please enter a valid phone number" }).optional(),
  location: z.string().min(2, { message: "Location must be at least 2 characters long" }).optional(),
  website: z.string().regex(urlRegex, { message: "Please enter a valid URL" }).optional(),
  linkedin: z.string().regex(linkedInRegex, { message: "Please enter a valid LinkedIn URL" }).optional(),
});

// Professional summary schema
export const summarySchema = z.object({
  text: z.string().min(20, { message: "Summary should be at least 20 characters" })
    .max(500, { message: "Summary should not exceed 500 characters" }),
});

// Experience schema
export const experienceItemSchema = z.object({
  title: z.string().min(2, { message: "Job title must be at least 2 characters long" }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters long" }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string(),
  current: z.boolean().optional(),
  description: z.string().min(10, { message: "Description should be at least 10 characters" }),
});

export const experienceSchema = z.object({
  jobs: z.array(experienceItemSchema),
});

// Education schema
export const educationItemSchema = z.object({
  institution: z.string().min(2, { message: "Institution name must be at least 2 characters long" }),
  degree: z.string().min(2, { message: "Degree must be at least 2 characters long" }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  gpa: z.string().optional(),
});

export const educationSchema = z.object({
  schools: z.array(educationItemSchema),
});

// Skills schema
export const skillsSchema = z.object({
  skills: z.array(z.string().min(1)).min(1, { message: "Add at least one skill" }),
});

// Project schema
export const projectItemSchema = z.object({
  title: z.string().min(2, { message: "Project title must be at least 2 characters long" }),
  date: z.string().optional(),
  url: z.string().regex(urlRegex, { message: "Please enter a valid URL" }).optional(),
  description: z.string().min(10, { message: "Description should be at least 10 characters" }),
});

export const projectsSchema = z.object({
  projects: z.array(projectItemSchema),
});

// User profile schema
export const userProfileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  country: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
});

// Resume metadata schema
export const resumeMetadataSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters long" }),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  targetJobTitle: z.string().optional(),
  targetCompany: z.string().optional(),
  languageCode: z.string(),
  isPublic: z.boolean().default(false),
});

// Helper functions for validation
export const validateField = <T extends z.ZodType>(
  schema: T,
  data: unknown
): { valid: boolean; errors?: Record<string, string> } => {
  try {
    schema.parse(data);
    return { valid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { valid: false, errors };
    }
    return { valid: false, errors: { _: 'Unknown validation error' } };
  }
};
