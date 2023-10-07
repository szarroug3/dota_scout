import { z, ZodEffects, ZodNumber, ZodString, ZodUnion } from 'zod';

export const ZodDotaId = (
  fieldName: string
): ZodEffects<ZodUnion<[ZodNumber, ZodString]>, string | number, unknown> =>
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
