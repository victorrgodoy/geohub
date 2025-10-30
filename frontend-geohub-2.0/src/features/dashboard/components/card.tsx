import { History } from "lucide-react";

type Props = {
  title: string;
  value?: string | null;
  value_title?: string | null;
};

function Card({ title, value, value_title }: Props) {
  return (
    <div className="shadow-sm w-full overflow-hidden border-r border-(--color-text)/10">
      <div className="p-4 flex flex-col gap-2 items-center md:items-start">
        <div className="card-actions flex justify-between">
          <h3 className="font-normal text-sm">{title}</h3>
        </div>
        <p className="font-semibold text-3xl antialiased">{value}</p>
        <div className="flex gap-2">
          <History size={18} className="text-(--color-primary)" />
          <p className={`font-normal text-sm text-(--color-primary)`}>
            {value_title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
