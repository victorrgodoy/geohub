import { Trash } from 'lucide-react'

type Props = {
  onClick: () => void;
};

export const ButtonDelete = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick} 
      className=" py-1
        hover:scale-105 transition duration-200 cursor-pointer
        text-red-600
      ">
      <Trash size={16}/>
    </button>
  );
};