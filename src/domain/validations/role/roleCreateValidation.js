import z from "zod";

const roleCreateValidation = z.object({
  name: z.string().min(5).max(15).optional(),
  permissions: z.string().array().optional(),
});

export default roleCreateValidation;
