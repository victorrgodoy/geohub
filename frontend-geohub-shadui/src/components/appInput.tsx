import type { ChangeEvent } from "react";
import { Input } from "../components/ui/input";

type Props = {
  type: string;
  placeholder: string;
  width?: "w-72" | "w-96" | "w-full";
  value?: string;           
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; 
};

export function AppInput({ type, placeholder,width, value, onChange }: Props) {
  return (
    <Input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={width || "w-72"}
    />
  );
}
