import { useCountry } from "../../features/country/hooks/useCrud";
import { useState } from "react";

//components
import { InputSearch } from "../../components/inputSearch";
import { ButtonOpenModal } from "../../components/buttonOpenModal";
import { Modal } from "../../features/country/components/modal";
import { FilterButton } from "../../components/filterButton";
import { TableView } from "../../components/tableView";
import type { Country as typeCountry } from "../../features/country/api/crud";
import { ButtonDelete } from "../../components/buttonDelete";
import { ButtonEdit } from "../../components/buttonEdit";

function Country() {
  const { countries, handleCreate, handleDelete, handleEdit } = useCountry();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<typeCountry | null>(
    null,
  );

  const handleEditClick = (country: typeCountry) => {
    setSelectedCountry(country);
    setOpenModal(true);
  };

  const handleCreateOrEdit = (country: typeCountry) => {
    if (selectedCountry) {
      handleEdit(country.id, country);
    } else {
      handleCreate(country);
    }
    setSelectedCountry(null);
  };

  const columnsCountry = [
    { key: "name", label: "Name"},
    { key: "population", label: "Population"},
    { key: "official_language", label: "Official Language"},
    { key: "currency", label: "Currency"},

    {
      key: "actions",
      label: "Actions",
      render: (country: typeCountry) => (
        <div className="flex gap-4 items-center">
          <ButtonDelete onClick={() => handleDelete(country.id)} />
          {/* <ButtonEdit onClick={() => handleEditClick(country)} /> */}
        </div>
      ),
    },
  ];

  return (
    <>
      {/* header */}
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="font-semibold">Country</h1>
          <p className="font-normal text-sm text-(--color-text)/60">
            Manage and organize all countries efficiently in one place
          </p>
        </div>
      </header>

      {/* ------------------------------------ */}

      {/* section */}
      <section className="flex sm:flex-row flex-col gap-10 justify-between sm:items-center items-end mb-10">
        <InputSearch />
        <div className="flex gap-4 items-center">
          <FilterButton />
          <ButtonOpenModal onClick={setOpenModal} />
        </div>
      </section>
      <section>
        <TableView columns={columnsCountry} data={countries} />
      </section>

      {openModal && (
        <Modal
          initialData={selectedCountry || undefined}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateOrEdit}
        />
      )}
    </>
  );
}

export default Country;
