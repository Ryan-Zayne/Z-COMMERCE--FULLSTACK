import { z } from "zod";

export const ResendVerificationEmailSchema = z.object({
	email: z.email("Invalid email").min(1, "Email is required"),
});

export * from "@z-commerce/shared/validation/auth";
