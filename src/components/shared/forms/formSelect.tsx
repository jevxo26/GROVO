import React from "react";
import { Control, FieldError, FieldValues, Path, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  options: SelectOption[];
  control: Control<TFieldValues>;
  error?: FieldError;
}

const FormSelect = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder = "Select an option",
  options,
  control,
  error,
}: FormSelectProps<TFieldValues>) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium" htmlFor={name}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange} 
            value={field.value} 
          >
            <SelectTrigger id={name} className="w-full" aria-invalid={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default FormSelect;