import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";

import { AppSelect } from "../../../components/appSelect";
import { AppTextArea } from "../../../components/appTextArea";

import { useForm, Controller } from "react-hook-form";
import type { Continent } from "../../../types/Continent";

const continentItems = [
  { label: "Africa", value: "africa" },
  { label: "Antarctica", value: "antarctica" },
  { label: "Asia", value: "asia" },
  { label: "Europe", value: "europe" },
  { label: "North America", value: "north_america" },
  { label: "Oceania", value: "oceania" },
  { label: "South America", value: "south_america" },
];

type Props = {
  defaultValues?: Partial<Continent>;
  onSave: (data: Continent) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};

export function OverviewModal({
  onDelete,
  onSave,
  onCancel,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Continent>({
    defaultValues: defaultValues || { name: "", description: "" },
  });
 

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSave)}>
        <CardHeader className="mb-10">
          <div className="flex justify-between items-center">
            <CardTitle>
              {defaultValues && defaultValues.id ? "Edit Continent" : "Register a new Continent"}
            </CardTitle>

            {defaultValues && defaultValues.id && (
              <Button
                onClick={() => onDelete(defaultValues.id!)}
                variant="destructive"
                className="h-7 cursor-pointer"
              >
                Delete
              </Button>
            )}
          </div>
          <CardDescription>
            {defaultValues && defaultValues.id
              ? "Update the information below."
              : "Fill out the fields below to add."}
          </CardDescription>
        </CardHeader>

        <CardContent className="mb-10">
          <div className="flex flex-col gap-10">
            <div className="grid gap-2">
              <Label htmlFor="continent">Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AppSelect
                    placeholder="Select a continent"
                    label="Name"
                    items={continentItems}
                    {...field}
                  />
                )}
              />
              {errors?.name?.type === "required" && (
                <p className="text-red-500 text-xs">Continent is required.</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AppTextArea {...field} placeholder="Description" />
                )}
              />
              {errors?.description?.type === "required" && (
                <p className="text-red-500 text-xs">Description is required.</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            className="w-44 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="w-44 cursor-pointer"
          >
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
