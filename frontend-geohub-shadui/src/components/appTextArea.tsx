import type { ChangeEvent } from "react";
import { Textarea } from "../components/ui/textarea";

type Props = {
  placeholder: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function AppTextArea({ placeholder, value, onChange }: Props) {
  return (
    <Textarea placeholder={placeholder} value={value} onChange={onChange} />
  );
}
