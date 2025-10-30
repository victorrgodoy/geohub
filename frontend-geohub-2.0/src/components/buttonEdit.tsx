import { Edit } from "lucide-react";

type Props = {
  onClick: () => void;
};

export const ButtonEdit = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className=" py-1
        hover:scale-105 transition duration-200 cursor-pointer
        text-blue-400
      "
    >
      <Edit size={16} />
    </button>
  );
};
