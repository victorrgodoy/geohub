import { Modal } from "../modalBase";
import type { Continent as typeContinent } from "../../types/continent";
import Select from "../select";
import Input from "../input";
import { ButtonCancel } from "../buttonCancel";
import { ButtonSave } from "../buttonSave";
import { useForm } from "react-hook-form";

type ContinentFormModalProps = {
  onClose: () => void;
  onSubmit: (data: typeContinent) => void;
  initialData?: typeContinent; 
};

export const FormModalContinent = ({
  onClose,
  onSubmit,
  initialData,
}: ContinentFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeContinent>();

  const optionsSelect = [
    { key: "africa", name: "Africa", value: "Africa" },
    { key: "north_america", name: "North America", value: "North America" },
    { key: "south_america", name: "South America", value: "South America" },
    { key: "antarctica", name: "Antarctica", value: "Antarctica" },
    { key: "asia", name: "Asia", value: "Asia" },
    { key: "europe", name: "Europe", value: "Europe" },
    { key: "oceania", name: "Oceania", value: "Oceania" },
  ];

  return (
    <Modal
      title={initialData ? "Edit Continent" : "Create Continent"}
      description="Enter the required information below"
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 mb-6">

          <Select
            optionTitle="Continent"
            label="Name"
            name="name"
            errors={errors}
            register={register}
            options={optionsSelect}
          />

          <Input
            type="text"
            label="Description"
            name="description"
            errors={errors}
            register={register}
          />

          <ButtonCancel onClick={onClose} />
          <ButtonSave />
        </div>
      </form>
    </Modal>
  );
};
