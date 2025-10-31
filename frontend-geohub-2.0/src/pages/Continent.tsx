import { useCreateContinent, useListContinent, useUpdateContinent, useDeleteContinent } from "../hooks/useContinent";
import type { Continent as typeContinent} from "../types/continent";
import { InputSearch } from "../components/inputSearch";
import { FilterButton } from "../components/filterButton";



function Continent() {
  const { data: continents, isLoading, error } = useListContinent();
  const createMutation = useCreateContinent();
  const updateMutation = useUpdateContinent();
  const deleteMutation = useDeleteContinent();

  return (
    <>
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="font-semibold">Continent</h1>
          <p className="font-normal text-sm text-(--color-text)/60">
            Manage and organize all continents efficiently in one place
          </p>
        </div>
      </header>

      <section className="flex sm:flex-row flex-col gap-10 justify-between sm:items-center items-end mb-10">
        <InputSearch />
        <div className="flex gap-4 items-center">
          <FilterButton />
        </div>
      </section>
      <section>
        
      </section>
    </>
  );
}

export default Continent;