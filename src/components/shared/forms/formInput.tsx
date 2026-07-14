import React from "react";
import { FieldError, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>; 
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  required?: boolean;
}

const FormInput = <TFieldValues extends FieldValues>({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
}: FormInputProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      <Input
        id={name}
        type={type}
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

export default FormInput;