import * as z from "zod";

import { validateEmail, validatePassword } from "./common.schema";

export const LoginSchema = z.object({
  email: validateEmail,
  password: validatePassword,
});

export const RegisterSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
