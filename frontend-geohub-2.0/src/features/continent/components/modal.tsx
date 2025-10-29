import { useForm } from "react-hook-form";
import type { Continent } from "../api/continent";
import { useEffect } from "react";

const continents = [
  { key: "africa", name: "Africa", value: "Africa" },
  { key: "north_america", name: "North America", value: "North America" },
  { key: "south_america", name: "South America", value: "South America" },
  { key: "antarctica", name: "Antarctica", value: "Antarctica" },
  { key: "asia", name: "Asia", value: "Asia" },
  { key: "europe", name: "Europe", value: "Europe" },
  { key: "oceania", name: "Oceania", value: "Oceania" }
];

type Props = {
  onClose: () => void;
  onSubmit: (continent: Continent) => void;
  initialData?: Continent
};

export const Modal = ({ onClose, onSubmit, initialData }: Props) => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm<Continent>();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ name: "0", description: "" });
    }
  }, [initialData, reset]);

  const handleSave = (data: Continent) => {
    onSubmit(data);
    onClose();
  };

  return (
    <>
      <div className="modal modal-open">
        <div className="modal-box w-fit bg-(--color-background)">

          {/* forms */}
          <form onSubmit={handleSubmit(handleSave)}>
            <h4 className="font-semibold mb-1 text-lg">Register a Continent</h4>
            <p className="text-xs text-(--color-text)/80 mb-5">
              Enter the required information below to register a new continent.
            </p>
            
            {/* option 1 */}
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-(--color-text)/90">
                Continent
              </label>
              <select  
                  defaultValue="0"
                  className={`
                  select bg-(--color-background) h-8 w-full
                  cursor-pointer transition-all duration-300 focus:outline-none 
                  ${errors?.name
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300" 
                    : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"}
                `}
                {...register("name", {validate: (value) => {
                  return value !== "0"
                }})}
                >   
                  <option value="0">Select a continent</option>  
                  {continents.map((c) => (
                    <option value={c.value} key={c.key}>{c.name}</option>  
                  ))}
              </select>
              {errors?.name?.type === 'validate' && 
                  <p className="text-xs text-red-400">Continent is required.</p>
                }
            </div>
                
            {/* option 2 */}      
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm font-medium text-(--color-text)/90">
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                className={`
                  border h-8 w-full p-3 text-sm rounded-md 
                  placeholder-gray-400 
                  transition-all duration-300 focus:outline-none 
                  ${errors?.description 
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300" 
                    : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"}
                `}
                  {...register("description", {required:true})}
                />
              
              {errors?.description?.type === 'required' && 
                  <p className="text-xs text-red-400">Description is required.</p>
                }
            </div>

            {/* buttons */}
            <div className="flex justify-between gap-2">
              <button 
                type="button" 
                onClick={onClose}
                className="
                  py-1.5 w-full rounded-sm text-xs border font-semibold
                  cursor-pointer text-(--color-text)
                  active:bg-[--color-primary]/70 active:scale-97 transition  
                  border-(--color-text)/30 shadow-xs 
                ">
                Cancel
              </button>
              <button 

                type="submit" 
                className="
                bg-blue-700/95 py-1.5 w-full rounded-sm 
                  text-xs font-semibold
                  cursor-pointer text-white hover:bg-blue-700 
                  active:bg-[--color-primary]/70 active:scale-97 transition  
                  ">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
