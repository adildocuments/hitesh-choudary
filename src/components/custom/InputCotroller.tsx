import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useToggle from "@/hook/useToggle";
import { Eye, EyeOff } from "lucide-react";
import { Control, Controller } from "react-hook-form";

interface InputType {
  placeholder?: string;
  label?: string;
  type?: any;
  className?: string;
  value?: string;
  name: string;
  error?: string;
  control?: Control<any>;
}

const InputController = ({
  placeholder,
  label,
  type = "text",
  className,
  control,
  name,
  error,
}: InputType) => {
  const [toggle, handleToggle] = useToggle(true);
  return (
    <>
      <div
        className={`grid w-full max-w-sm items-center gap-4 mb-4 ${className}`}
      >
        {label && <Label>{label}</Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={type === "password" ? (toggle ? "password" : "text") : type}
              placeholder={placeholder}
            />
          )}
        />
        {type === "password" ? (
          toggle ? (
            <Eye className="absolute bottom-2 right-2" onClick={handleToggle} />
          ) : (
            <EyeOff
              className="absolute bottom-2 right-2"
              onClick={handleToggle}
            />
          )
        ) : null}
        {error && <span className="text-red-700 font-medium">{error}</span>}
      </div>
    </>
  );
};

export default InputController;
