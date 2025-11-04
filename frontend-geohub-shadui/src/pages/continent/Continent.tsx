import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom"; 
import { Plus, Pencil, Trash } from "lucide-react";
import { AppTable } from "../../components/appTable";
import { Button } from "../../components/ui/button";
import { useCreateCountry, useDeleteCountry, useFindByContinentIdCountry, useUpdateCountry } from "../../hooks/country/index";
import { usePageTitle } from "../../context/pageTitle/pageTitleProvider";
import type { Country } from "../../types/Country";
import { useFindByIdContinent } from "../../hooks/continent/index";
import { ModalCreateCountry, type CountryItem } from "./components/ModalCreateCountry";
import { formatNumber } from "../../utils/formatNumber";
import { SearchBar } from "./components/SearchBar";
import { HeaderStats } from "./components/HeaderStats";

function Continent() {
  const { setPageTitle } = usePageTitle();
  const { continentId } = useParams()
  const { data: continent} = useFindByIdContinent(Number(continentId));
  const { data: countries } = useFindByContinentIdCountry(Number(continentId));
  const deleteCountry = useDeleteCountry();
  const createCountry = useCreateCountry();
  const updateCountry = useUpdateCountry();
  const [editCountry, setEditCountry] = useState<Country | null >(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    if (continent) {
      setPageTitle(continent.name); 
    }
  }, [continent, setPageTitle]);
  
  function handleEdit(country: Country) {
    setEditCountry(country);
    setOpenModal(true);
  }

  function handleNew() {
    setEditCountry(null)
    setOpenModal(true);
  }

  const handleSave = async (country: Country) => {
    if (country.id) {
      await updateCountry.mutateAsync({ id: country.id, data: country });
    } else {
      await createCountry.mutateAsync({
        ...country,
        continentId: Number(continentId),
      });
    }
    setOpenModal(false);
  };

  const handleDelete = async(id: number) => {
    await deleteCountry.mutateAsync(id)
    setOpenModal(false)
  }

  const columns = useMemo(() => [
  { 
    key: 1,
    name: "name", 
    label: "Name",
    render: (country: Country) => (
      <div className="flex items-center gap-2">
        <div className="font-medium">{country.name}</div>
      </div>
    )
  },
  { 
    key: 2,
    name: "population", 
    label: "Population",
    render: (country: Country) => (
      <div className="font-medium tabular-nums">
        {formatNumber(country.population)}
      </div>
    )
  },
  { 
    key: 3,
    name: "official_language", 
    label: "Official Language",
    render: (country: Country) => (
      <div className="font-medium">
        {country.official_language}
      </div>
    )
  },
  { 
    key: 4,
    name: "currency", 
    label: "Currency",
    render: (country: Country) => (
      <div className="font-medium">
        {country.currency}
      </div>
    )
  },
  { 
    key: 5, 
    name: "actions", 
    label: "",
    render: (country: Country) => (
      <div className="flex gap-2 justify-end">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleEdit(country)}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <span className="sr-only">Edit</span>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleDelete(country.id)}
          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
        >
          <span className="sr-only">Delete</span>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    )
  }
], [handleEdit, handleDelete]); 

  const tableData = useMemo(() => {
    const data = countries || [];
    if (!searchQuery) return data;
    
    return data.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.official_language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.currency.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [countries, searchQuery]);

  const countryItems: CountryItem[] = useMemo(() => 
    countries?.map(country => ({
      label: country.name,
      value: country.name.toLocaleLowerCase()
    })) || []
  , [countries]);

  return (
    <div className="flex flex-col space-y-8">      
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{continent?.name}</h2>
              <p className="text-sm text-muted-foreground">{continent?.description}</p>
            </div>
            <HeaderStats 
              totalCountries={countries?.length || 0}
              totalPopulation={countries?.reduce((acc, curr) => acc + curr.population, 0) || 0}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
            />
            <Button 
              onClick={handleNew} 
              className="cursor-pointer transition-all duration-200 hover:scale-105"
            >
              <Plus className="mr-2 h-4 w-4"/>
              Add Country
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border shadow-sm">
        <AppTable 
          caption="Countries" 
          columns={columns} 
          data={tableData}  
        />
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 duration-200">
            <ModalCreateCountry
              countryItems={countryItems} 
              defaultValues={editCountry || undefined}
              onCancel={() => setOpenModal(false)}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Continent;