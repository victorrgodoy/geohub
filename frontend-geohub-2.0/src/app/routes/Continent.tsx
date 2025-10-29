import { useContinent } from "../../features/continent/hooks/useContinent";
import { useState } from "react";

//components
import { Input } from "../../components/input";
import { ButtonOpenModal } from "../../components/buttonOpenModal";
import { Modal } from "../../features/continent/components/modal";
import { FilterButton } from "../../components/filterButton";
import { TableView } from "../../components/tableView";
import type { Continent } from "../../features/continent/api/continent";
import { ButtonDelete } from "../../components/buttonDelete";
import { ButtonEdit } from "../../components/buttonEdit";

function Continent() {
  const { continents, handleCreate, handleDelete, handleEdit } = useContinent();
  const [openModal, setOpenModal] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null)

  const handleEditClick = (continent: Continent) => {
    setSelectedContinent(continent)
    setOpenModal(true)
  }

  const handleCreateOrEdit = (continent: Continent) => {
    if (selectedContinent) {
      handleEdit(continent.id, continent);
    } else{
      handleCreate(continent);  
    }
    setSelectedContinent(null)
  };
 
  const columnsContinent = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { 
    key: "actions", 
    label: "Actions", 
    render: (continent:Continent) => (
      <div className="flex gap-4 items-center">
        <ButtonDelete onClick={() => handleDelete(continent.id)}/>
        <ButtonEdit onClick={() => handleEditClick(continent)}/>
      </div>
    )
  },
];

  return (
    <>
      {/* header */}
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="font-semibold">Continent</h1>
          <p className="font-normal text-sm text-(--color-text)/60">
            Manage and organize all continents efficiently in one place
          </p>
        </div>
      </header>

      {/* ------------------------------------ */}

      {/* section */}
      <section className="flex justify-between items-center mb-10">
        <Input/>
        <div className="flex gap-4 items-center">
          <FilterButton />
          <ButtonOpenModal onClick={setOpenModal}/>
        </div>
      </section>
      <section>
        <TableView columns={columnsContinent} data={continents} />
      </section>

      {openModal && 
        <Modal initialData={selectedContinent || undefined} onClose={() => setOpenModal(false)} onSubmit={handleCreateOrEdit}/>
      }
    </>
  );
}

export default Continent;