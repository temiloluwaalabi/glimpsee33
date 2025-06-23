import * as z from "zod";

import { messages } from "@/config/messages";

export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail })
  .refine((email) => email.length <= 254, { message: "Email is too long" });

export const EmailSchema = z.object({
  email: validateEmail,
});

// Custom validation for phone number
export const validatePhoneNumber = z
  .string()
  .min(1, { message: "Phone number is required" })
  .regex(/^\+?[0-9]\d{1,11}$/, { message: "Invalid phone number format" }); // Follows E.164 format

// Custom validation for username
export const validateUsername = z
  .string()
  .min(1, { message: "Username is required" })
  .regex(/^[a-zA-Z0-9_.-]{3,30}$/, { message: "Invalid username format" }); // Alphanumeric with specific allowed symbols

export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
  .min(1, {
    message: messages.passwordLengthMin,
  });
// .regex(/.*[A-Z].*/, {
//   message: messages.passwordOneUppercase,
// })
// .regex(/.*[a-z].*/, {
//   message: messages.passwordOneLowercase,
// })
// .regex(/.*\d.*/, {
//   message: messages.passwordOneNumeric,
// });
export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
  .min(6, { message: messages.passwordLengthMin })
  .regex(/.*[A-Z].*/, {
    message: messages.passwordOneUppercase,
  })
  .regex(/.*[a-z].*/, {
    message: messages.passwordOneLowercase,
  })
  .regex(/.*\d.*/, {
    message: messages.passwordOneNumeric,
  });

export const SetupPasswordCSchema = z
  .object({
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
  })
  .refine(
    (data) => {
      if (data.password && !data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.confirmPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ["confirmPassword"], // Correct path for the confirmedPassword field
  });

export type PasswordSchemaType = z.infer<typeof SetupPasswordCSchema>;
export type EmailSchemaType = z.infer<typeof EmailSchema>;
