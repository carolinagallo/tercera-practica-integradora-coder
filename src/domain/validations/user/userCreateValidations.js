import z from "zod";

const userCreateValidation = z.object({
  firstName: z.string().min(1).max(35).optional(),
  lastName: z.string().min(1).max(35).optional(),
  email: z.string().email().optional(),
  age: z.number().optional(),
  password: z.string().optional(),
});

export default userCreateValidation;
