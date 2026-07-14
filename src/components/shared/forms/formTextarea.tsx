import React from "react";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormTextareaProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  required?: boolean;
}

const FormTextarea = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  error,
  required = false,
}: FormTextareaProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        {...register(name)}
        aria-invalid={!!error}
      />
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormTextarea;