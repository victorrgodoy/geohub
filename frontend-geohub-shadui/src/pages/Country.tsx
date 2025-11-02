import { useState } from "react";
import {
  useCreateCountry,
  useDeleteCountry,
  useListCountry,
  useUpdateCountry,
} from "../hooks/useCountry";

//components
import { AppInput } from "../components/appInput";
import { AppButton } from "../components/appButton";
import { AppTable } from "../components/appTable";
import { AppCountryCardForm } from "../components/forms/appCountryCardForm";
import { Trash } from 'lucide-react';
import { SquarePen } from 'lucide-react';

import type { Country } from "../types/Country";

function Country() {
  const { data: countries } = useListCountry();
  const [openModal, setOpenModal] = useState(false);
  const [editCountry, setEditCountry] = useState<Country | null>(null);
  const createMutation = useCreateCountry();
  const updateMutation = useUpdateCountry();
  const deleteMutation = useDeleteCountry();

  const handleSave = async (country:Country) => {
    if(country.id){
      await updateMutation.mutateAsync({id: country.id, data:country})
    }else{
      await createMutation.mutateAsync(country)
    }
    handleCloseModal()
  }

  const handleNew = () => {
    setEditCountry(null); 
    setOpenModal(true)
  }

  const handleEdit = async (country:Country) => {
    setEditCountry(country)
    setOpenModal(true)
  }

  const handleDelete = async (id: number) => {
    await deleteMutation.mutateAsync(id);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditCountry(null); 
  }

  const columns = [  
  { key: 1, name: "id", label: "ID" },  
  { key: 2, name: "name", label: "Name" },
  { key: 3, name: "population", label: "Population"},
  { key: 4, name: "official_language", label: "Official Language"},
  { key: 5, name: "currency", label: "Currency"},
  { key: 6, name: "continentId", label: "ContinentId"},
  {
    key: 7,
    name: "actions",
    label: "Actions",
    render: (country: Country) => (
      <div className="flex gap-5 justify-end">
        <button className="cursor-pointer" onClick={() => handleEdit(country)}>
          <SquarePen size={18}/>
        </button>
        <button className="cursor-pointer" onClick={() => handleDelete(country.id)}>
          <Trash size={18}/>
        </button>
      </div>
    ),
  },
];

  return (
    <>
      {/*-------------------- HEADER -------------------- */}
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-3xl">Country</h1>
        </div>
      </header>

      {/*-------------------- SECTION -------------------- */}
      <section
        className="
          flex sm:flex-row flex-col gap-10 justify-between sm:items-cente
          items-end mb-10
        "
      >
        <AppInput type="text" placeholder="Search" />
        <AppButton title="New" onClick={handleNew} />
      </section>

      <section>
        <AppTable caption="List of Countrys" columns={columns} data={countries || []} />
      </section>

      {/*-------------------- MODAL -------------------- */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppCountryCardForm 
            defaultValues={editCountry || undefined}
            onCancel={() => handleCloseModal()}
            onSave={handleSave}
            />
        </div>
      )}
    </>
  );
}

export default Country;
