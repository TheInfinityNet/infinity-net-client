import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export enum Genders {
  Male = "male",
  Female = "female",
  Other = "other",
}

export const SignUpSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  middleName: z.string().max(50).optional(),
  username: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  passwordConfirmation: z.string().min(8).max(50),
  mobileNumber: z.string().min(10).max(15),
  birthdate: z.string().date(),
  gender: z.nativeEnum(Genders),
  acceptTerms: z.boolean().refine((value) => value === true),
});
