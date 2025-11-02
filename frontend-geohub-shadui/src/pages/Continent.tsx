import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useCreateContinent,
  useDeleteContinent,
  useListContinent,
  useUpdateContinent,
} from "../hooks/useContinent";
import type { Continent } from "../types/Continent";

//components
import { AppContinentCardForm } from "../components/forms/appContinentCardForm";
import { AppItem } from "../components/appItem";

function Continent() {
  const navigate = useNavigate();
  const { data: continents } = useListContinent();
  const [openModal, setOpenModal] = useState(false);
  const [editContinent, setEditContinent] = useState<Continent | null>(null);
  const createMutation = useCreateContinent();
  const updateMutation = useUpdateContinent();
  const deleteMutation = useDeleteContinent();

  // const handleNew = () => {
  //   setEditContinent(null); 
  //   setOpenModal(true)
  // }
 const handleSave = async (continent:Continent) => {
    if(continent.id){
      await updateMutation.mutateAsync({id: continent.id, data:continent})
    }else{
      await createMutation.mutateAsync(continent)
    }
    handleCloseModal()
  }

  const handleEdit = async (continent:Continent) => {
    setEditContinent(continent)
    setOpenModal(true)
  }

  // const handleDelete = async (id: number) => {
  //   await deleteMutation.mutateAsync(id);
  // }

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditContinent(null); 
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">

      {/*-------------------- HEADER -------------------- */}
      <header className="col-span-3 mb-12 flex justify-between items-center">
          <h1 className="font-semibold text-3xl">Overview</h1>
      </header>
      
      {/*-------------------- SECTION -------------------- */}
      <section className="col-start-2 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="mb-8 text-lg font-medium">Continents in the System</h2>
        </div>
          <div className="flex flex-col gap-4 justify-between ">
          {continents?.map((continent) => (
            <AppItem 
              key={continent.id} 
              title={continent.name}
              description={continent.description}
              onEdit={() => handleEdit(continent)}
              onExplore={() => navigate(`/continent/${continent.id}/country`)}
            />
          ))}
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <AppContinentCardForm 
            defaultValues={editContinent || undefined}
            onCancel={() => handleCloseModal()}
            onSave={handleSave}
            />
        </div>
      )}
    </div>
  );
}

export default Continent;
