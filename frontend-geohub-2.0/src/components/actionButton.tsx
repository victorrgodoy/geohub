import { Plus } from "lucide-react";

type Props = {
    title: string;
    type?: "submit" | "reset" | "button"; 
    onClick?: () => void;
}

export const ActionButton = ({ title, type = "button", onClick }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn btn-active
        bg-(--color-primary)
        border-(--color-text)/20 text-(--color-background)
        hover:bg-(--color-primary)/90 active:bg-[--color-primary]/70
        active:scale-97 transition"
    >
      <Plus size={14} />
      {title}
    </button>
  );
};