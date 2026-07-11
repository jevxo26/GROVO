import React from "react";
import { Control, FieldError, FieldValues, Path, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>; 
  error?: FieldError;
}

const FormCheckbox = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  error,
}: FormCheckboxProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={field.value} 
              onCheckedChange={field.onChange} 
              aria-invalid={!!error}
            />
          )}
        />
        
        <div className="space-y-1 leading-none">
          <Label className="text-sm font-medium cursor-pointer" htmlFor={name}>
            {label}
          </Label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormCheckbox;