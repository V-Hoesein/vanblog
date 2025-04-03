import { ZodSchema } from "zod";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; errors: Record<string, unknown> };

export function validationHandler<T>(
  schema: ZodSchema<T>,
  body: unknown,
  errorMessage = "Validation error"
): ValidationResult<T> {
  const result = schema.safeParse(body);

  if (!result.success) {
    return {
      success: false,
      message: errorMessage,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return { success: true, data: result.data };
}
