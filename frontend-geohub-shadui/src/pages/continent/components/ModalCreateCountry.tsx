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

import { useForm, Controller } from "react-hook-form";
import type { Country } from "../../../types/Country";
import { Input } from "../../../components/ui/input";

export type CountryItem = {
  label: string;
  value: string;
};

type Props = {
  countryItems: CountryItem[];
  defaultValues?: Partial<Country>;
  onSave: (data: Country) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};


export function ModalCreateCountry({
  countryItems,
  onDelete,
  onSave,
  onCancel,
  defaultValues,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Country>({
    defaultValues: defaultValues || { name: "", population: 0, official_language: "", currency: ""},
  });
 
  return (
    <Card className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSave)}>
        <CardHeader className="mb-10">
          <div className="flex justify-between items-center">
            <CardTitle>
              {defaultValues && defaultValues.id ? "Edit Country" : "Register a new Country"}
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
                    placeholder="Select a Country"
                    label="Name"
                    items={countryItems}
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
                  <Input {...field} placeholder="Population" />                
                )}
              />
              {errors?.population?.type === "required" && (
                <p className="text-red-500 text-xs">Population is required.</p>
              )}
            </div>
            
               <div className="grid gap-2">
              <Label htmlFor="population">Official Language</Label>
              <Controller
                name="official_language"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} placeholder="Official Language" />                
                )}
              />
              {errors?.official_language?.type === "required" && (
                <p className="text-red-500 text-xs">Official Languageis required.</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="population">Currency</Label>
              <Controller
                name="currency"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} placeholder="Currency" />                
                )}
              />
              {errors?.currency?.type === "required" && (
                <p className="text-red-500 text-xs">Currency Languageis required.</p>
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
