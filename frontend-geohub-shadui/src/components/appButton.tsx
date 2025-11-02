import { Button } from "../components/ui/button";

type Props = {
  title: string;
  onClick: () => void;
};

export function AppButton({ title, onClick }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button className="cursor-pointer"  onClick={onClick} >
        {title}
      </Button>
    </div>
  );
}
