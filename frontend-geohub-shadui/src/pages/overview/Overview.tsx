import { useNavigate } from "react-router-dom";
import { TableCountry } from "./components/table-country/tableCountry";
import { CardContinent, CardModalContinent } from "./components/card-continent/index";
import { CardStats } from "./components/card-stats/index";
import { useOverviewModal } from "../../hooks/overview";

function Overview() {
  const navigate = useNavigate();
  const { 
    isOpen, 
    editingContinent, 
    openNew, 
    openEdit, 
    close, 
    save, 
    remove 
  } = useOverviewModal();

  const handleExplore = (continentId: number) => {
    navigate(`/continent/${continentId}/country`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full">
        <CardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7">
          <CardContinent
            onNew={openNew}
            onEdit={openEdit}
            onExplore={handleExplore}
          />
        </section>
        
        <section className="lg:col-span-5">
          <TableCountry />
        </section>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <CardModalContinent
            defaultValues={editingContinent || undefined}
            onCancel={close}
            onSave={save}
            onDelete={remove}
          />
        </div>
      )}
    </div>
  );
}

export default Overview;