// import { SquarePen, Trash } from "lucide-react";
import { AppTable } from "../../components/appTable";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useListCountry } from "../../hooks/useCountry";

function Continent() {
  const { data: countries } = useListCountry();
  // const [openModal, setOpenModal] = useState(false);
  // const [editCountry, setEditCountry] = useState<Country | null>(null);
  // const createMutation = useCreateCountry();
  // const updateMutation = useUpdateCountry();
  // const deleteMutation = useDeleteCountry();

  const columns = [
  { key: 1, name: "id", label: "ID" },
  { key: 2, name: "name", label: "Name" },
  { key: 3, name: "population", label: "Population"},
  { key: 4, name: "official_language", label: "Official Language"},
  { key: 5, name: "currency", label: "Currency"},
  { key: 6, name: "continentId", label: "ContinentId"},
  // {
  //   key: 7,
  //   name: "actions",
  //   label: "Actions",
  //   render: (country: Country) => (
  //     <div className="flex gap-5 justify-end">
  //       <button className="cursor-pointer" onClick={() => handleEdit(country)}>
  //         <SquarePen size={18}/>
  //       </button>
  //       <button className="cursor-pointer" onClick={() => handleDelete(country.id)}>
  //         <Trash size={18}/>
  //       </button>
  //     </div>
  //   ),
  // },
];

  return (
    <>
      {/*-------------------- SECTION -------------------- */}
      <section
        className="
          flex sm:flex-row flex-col gap-10 justify-between sm:items-cente
          items-end mb-10
        "
      >
        <Input type="text" placeholder="Search" />
        <Button title="New"/>
      </section>

      <section>
        <AppTable caption="List of Countrys" columns={columns} data={countries || []} />
      </section>

      {/*-------------------- MODAL -------------------- */}
      {/* {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppCountryCardForm
            defaultValues={editCountry || undefined}
            onCancel={() => handleCloseModal()}
            onSave={handleSave}
            />
        </div>
      )} */}
    </>
  );
}

export default Continent;
