import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setFormError<TFieldValues extends FieldValues = FieldValues>(
  form: UseFormReturn<TFieldValues>,
  errors: Record<string, string | string[]>,
) {
  Object.entries(errors).forEach(([key, value]) => {
    const keyError = key as FieldPath<TFieldValues>;
    typeof value === "string"
      ? form.setError(keyError, { message: value })
      : form.setError(keyError, { message: value[0] });
  });
}
