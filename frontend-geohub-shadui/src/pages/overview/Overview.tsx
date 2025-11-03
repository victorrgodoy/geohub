import type { Continent } from "../../types/Continent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Earth, Plus } from "lucide-react";

import { useTotalPopulation, useTotalCountry, useTop5Country } from "../../hooks/useCountry";
import { useListContinent, useCreateContinent, useUpdateContinent } from "../../hooks/useContinent";

import { OverviewCardHeader } from "./components/OverviewCardHeader";
import { OverviewCardContinent} from "./components/OverviewCardContinent";
import { OverviewModal } from "./components/OverviewModal";
import { Button } from "../../components/ui/button";
import { Donut } from "./components/OverviewDonut";
import { AppTable } from "../../components/appTable";
import type { Top5Country } from "../../types/Country";

function Overview() {
  const { data: top5Countries} = useTop5Country();
  const { data: totalPopulation } = useTotalPopulation();
  const { data: totalCountry } = useTotalCountry();
  const { data: continents } = useListContinent();
  const createMutation = useCreateContinent();
  const updateMutation = useUpdateContinent();
  const [openModal, setOpenModal] = useState(false);
  const [editContinent, setEditContinent] = useState<Continent | null>(null);
  const navigate = useNavigate();

  function handleEdit(continent: Continent) {
    setEditContinent(continent);
    setOpenModal(true);
  }

   const handleSave = async (continent:Continent) => {
    if(continent.id){
      await updateMutation.mutateAsync({id: continent.id, data:continent})
    }else{
      await createMutation.mutateAsync(continent)
    }
    setOpenModal(false);
  }

  const columnsCountry = [
    { key: 1, name: "id", label: "ID" },
    { key: 2, name: "name", label: "Name" },
    { key: 3, name: "population", label: "Population"},
    { key: 4, name: "official_language", label: "Official Language"},
    { key: 5, name: "currency", label: "Currency"},
  ];

  return (
    <div className="grid grid-cols-3 gap-10">
      <section className="col-span-3">
        <div className="w-full rounded-md gap-1 flex flex-col sm:flex-row border">
          <OverviewCardHeader
            header="Total Population"
            item={totalPopulation}
          />
          <div className="border-[0.5px] border-border" />
          <OverviewCardHeader header="Total Countries" item={totalCountry} />
          <div className="border-[0.5px] border-border" />
          <OverviewCardHeader header="Total Cities" item={totalPopulation} />
        </div>
      </section>

      {/* SECTION 2 */}
    <section className="flex flex-col lg:grid grid-cols-3 gap-4 col-span-3">
     <div className="col-span-2 border py-4 rounded-md flex flex-col min-h-72 max-h-80">
          <div className="flex justify-between items-center gap-2 mb-4 px-4">
            <div className="flex items-center gap-2">
              <Earth strokeWidth={1.5} className="size-5" />
              <h2 className="text-lg font-medium">Continents in the System</h2>
            </div>
            <Button className="h-9 cursor-pointer">
              <Plus className="size-4" />Add
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col divide-y divide-border">
            {continents?.map((continent) => (
              <OverviewCardContinent
                key={continent.id}
                title={continent.name}
                description={continent.description}
                onEdit={() => handleEdit(continent)}
                onExplore={() => navigate(`/continent/${continent.id}/country`)}
              />
            ))}
          </div>
        </div>
       <div className="w-full border rounded-md p-4">
         <h3 className="mb-6">Population by Continent</h3>
         <div className="w-full h-56 flex sm:flex-row justify-center">
           <Donut />
         </div>
       </div>
      </section>
      
      <section className="col-span-3">
        <div>
          <h3 className="text-lg font-medium">Top 5 Countries</h3>
          <AppTable<Top5Country> caption="Top 5 Countries" columns={columnsCountry} data={top5Countries ?? []}/>
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <OverviewModal
            defaultValues={editContinent || undefined}
            onCancel={() => setOpenModal(false)}
            onSave={handleSave}
            />
        </div>
      )}
    </div>
  );
}
export default Overview;
