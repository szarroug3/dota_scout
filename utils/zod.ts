import { z, ZodTypeAny } from 'zod';

export const ZodDotaId = (fieldName: string): ZodTypeAny =>
  z.preprocess((input, ctx) => {
    if (!input) {
      return input;
    }

    const processed = z
      .string()
      .regex(/^\d+$/)
      .transform(Number)
      .safeParse(input);
    if (!processed.success || processed.data <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: `Must be a valid Dota ${fieldName}`,
        fatal: true,
      });
      return input;
    }
    return processed.data;
  }, z.number().or(z.string()));
