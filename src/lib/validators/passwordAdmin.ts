import { z } from "zod";

export const PasswordAdminValidator = z.object({
  password: z.string().min(2).max(15),
});

export type PasswordAdminValidatorPayload = z.infer<
  typeof PasswordAdminValidator
>;
