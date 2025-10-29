import FilterButton from "../../components/filterButton";
import { ActionButton } from "../../components/actionButton";
import Table from "../../components/table";
import { useContinent } from "../../features/continent/hooks/useContinent";
import { useState } from "react";
import Modal from "../../features/continent/components/modal";

const columnsContinent = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
];

function Continent() {
  const { continents, addContinent } = useContinent();
  const [openModal, setOpenModal] = useState(false);


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
        <ActionButton title="New Continent" onClick={() => setOpenModal(true)}/>
      </header>

      <section className="flex justify-between items-center mb-10">
        <FilterButton />
      </section>
      <section>
        <Table columns={columnsContinent} data={continents} />
      </section>

      {openModal && (<Modal onClose={ () => setOpenModal(false)}/>)}
    </>
  );
}

export default Continent;
