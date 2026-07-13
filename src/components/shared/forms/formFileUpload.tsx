import React from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFileUploadProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  accept?: string;
  multiple?: boolean;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
}

const FormFileUpload = <TFieldValues extends FieldValues>({
  label,
  name,
  accept,
  multiple = false,
  register,
  error,
}: FormFileUploadProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium" htmlFor={name}>
        {label}
      </Label>
      <Input
        id={name}
        type="file"
        accept={accept}
        multiple={multiple}
        {...register(name)}
        aria-invalid={!!error}
        className="cursor-pointer file:cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormFileUpload;
