import { Plus } from "lucide-react";

type Props = {
  onClick: (value: boolean) => void;
};

export const ButtonOpenModal = ({ onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="
        flex items-center gap-1
        bg-(--color-primary) text-(--color-background) font-medium
        px-4 py-1.5 rounded-sm shadow-lg hover:shadow-lg
        active:scale-97 transition duration-300 cursor-pointer text-xs
      "
    >
      <Plus size={14} />
      New
    </button>
  );
};