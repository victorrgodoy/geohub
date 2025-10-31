import { useState } from "react";
import {
  useCreateContinent,
  useListContinent,
  useUpdateContinent,
  // useDeleteContinent,
} from "../hooks/useContinent";
import type { Continent as typeContinent } from "../types/continent";
import type { ColumnDef } from "@tanstack/react-table";

//components
import { InputSearch } from "../components/inputSearch";
import { TableView } from "../components/tableView";
import { ButtonOpenModal } from "../components/buttonOpenModal";
import { FormModalContinent } from "../components/forms/formModalContinent";

function Continent() {
  const { data: continents } = useListContinent();
  const [openModal, setOpenModal] = useState(false);
  const createMutation = useCreateContinent();
  const updateMutation = useUpdateContinent();
  // const deleteMutation = useDeleteContinent();

  const columns: ColumnDef<typeContinent>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium">{String(getValue())}</span>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => String(getValue()),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => console.log("Edit", row.original)}
            className="text-primary-500 hover:text-primary-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => console.log("Delete", row.original.id)}
            className="text-error hover:text-error/80 text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleSubmit = async (data: typeContinent) => {
    try {
      if(data.id) {
        await updateMutation.mutateAsync({id: data.id, data});
      } else {
        await createMutation.mutateAsync(data);
      }
      setOpenModal(false)
    } catch(error) {
      console.error('Error to saving continent: ', error)
    }
  }

  return (
    <>
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-3xl">Continent</h1>
        </div>
      </header>

      <section className="flex sm:flex-row flex-col gap-10 justify-between sm:items-center items-end mb-10">
        <InputSearch />
        <div className="flex gap-4 items-center">
          <ButtonOpenModal onClick={() => setOpenModal(true)} />
        </div>
      </section>
      <section>
        <TableView columns={columns} data={continents || []} />
      </section>

      {openModal && 
        <FormModalContinent 
          onClose={() => setOpenModal(false)} 
          onSubmit={handleSubmit}
        />
      }
    </>
  );
}

export default Continent;
