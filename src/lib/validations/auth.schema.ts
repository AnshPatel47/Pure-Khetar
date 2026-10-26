import { z } from 'zod';

const email = z.string().trim().toLowerCase().email('Enter a valid email address').max(120);

/** Accepts 98765 43210, +91 98765-43210, 919876543210 … and normalises to 10 digits. */
export const indianPhone = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ''))
  .refine((value) => /^(\+?91)?[6-9]\d{9}$/.test(value), 'Enter a valid 10-digit mobile number')
  .transform((value) => value.slice(-10));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password'),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name').max(60),
    email,
    phone: z
      .union([z.literal(''), indianPhone])
      .optional()
      .transform((value) => value || undefined),
    password: z
      .string()
      .min(8, 'Use at least 8 characters')
      .max(72, 'Use at most 72 characters')
      .regex(/[A-Za-z]/, 'Include at least one letter')
      .regex(/\d/, 'Include at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
