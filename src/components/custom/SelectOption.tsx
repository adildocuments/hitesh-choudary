import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Controller, Control } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

interface SelectOptionProps {
  placeholder?: string;
  label?: string;
  options: Option[];
  name: string;
  error?: string;
  control: Control<any>;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  placeholder,
  label,
  options,
  name,
  control,
  error,
}) => {
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-4 mb-4">
        {label && <Label>Role</Label>}
        <Controller
          name={name} // Ensure name is provided here
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              value={value}
              onValueChange={onChange} // Ensure this matches how your Select component handles changes
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {error && <span className="text-red-700 font-medium">{error}</span>}
      </div>
    </>
  );
};

export default SelectOption;
