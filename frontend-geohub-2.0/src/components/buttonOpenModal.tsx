import { Plus } from "lucide-react";

type Props = {
  onClick: (value: boolean) => void;
};

export const ButtonOpenModal = ({ onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(true)}
      className="
        flex items-center gap-1 border-none
        bg-(--color-primary-500) text-(--color-text-tertiary) 
        px-5 h-8 rounded-md shadow-lg hover:shadow-lg font-medium
        active:scale-97 transition duration-300 cursor-pointer text-sm
      "
    >
      <Plus size={18} />
      Add
    </button>
  );
};
