//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

//components
import { AppInput } from "../appInput";
import { AppSelect, type Items } from "../appSelect";

import { useForm, Controller } from "react-hook-form";
import type { Country } from "../../types/Country";

const CountryItems: Items[] = [
  {
    value: "fefe",
    label: "fef",
  },
];

type Props = {
  defaultValues?: Partial<Country>;
  onSave: (data: Country) => void;
  onCancel: () => void;
};

export function AppCountryCardForm({ onSave, onCancel, defaultValues }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Country>({
    defaultValues: defaultValues || {
      id: 0,
      name: "",
      population: 0,
      official_language: "",
      currency: "",
      continentId: 0,
    },
  });

  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSave)}>
        <CardHeader className="mb-10">
          <CardTitle>Register a new Country</CardTitle>
          <CardDescription>Fill out the fields below to add.</CardDescription>
        </CardHeader>

        <CardContent className="mb-10">
          <div className="flex flex-col gap-10">
            <div className="grid gap-2">
              <Label htmlFor="country">Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AppSelect
                    placeholder="Select a Country"
                    label="Name"
                    items={CountryItems}
                    {...field}
                  />
                )}
              />
              {errors?.name?.type === "required" && (
                <p className="text-red-500 text-xs">Country is required.</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="population">Population</Label>
              <Controller
                name="population"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <AppInput
                    value={field.value?.toString() || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    type="text"
                    placeholder="Population"
                    width="w-full"
                  />
                )}
              />
              {errors?.population?.type === "required" && (
                <p className="text-red-500 text-xs">Population is required.</p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            className="w-44 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="w-44 cursor-pointer"
          >
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
