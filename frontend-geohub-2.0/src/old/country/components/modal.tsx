// import { useForm } from "react-hook-form";
// import type { Country } from "../api/crud";
// import { useRestCountries } from "../hooks/useRestCountries";
// import { useContext, useEffect, useState } from "react";
// import Select from "../../../components/select";
// import Input from "../../../components/input";
// import { ButtonSave } from "../../../components/buttonSave";
// import { ButtonCancel } from "../../../components/buttonCancel";
// import type { RestCountry } from "../hooks/useRestCountries";
// import { ContinentContext } from "../../../context/continent/continentContext";


// type Props = {
//   onClose: () => void;
//   onSubmit: (country: Country) => void;
//   initialData?: Country;
// };

// export const Modal = ({ onClose, onSubmit, initialData }: Props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<Country>();
//   const { countryOptions } = useRestCountries();
//   const [selectedCountry, setSelectedCountry] = useState<RestCountry | null>(null);
//   const { continents } = useContext(ContinentContext)

//   useEffect(() => {
//     if (initialData) {
//       reset(initialData);
//     } else {
//       reset({
//         name: "",
//         population: 0,
//         official_language: "",
//         currency: "", 
//       });
//     }
//   }, [initialData, reset]);

//   const handleSave = (data: Country) => {
//   if (selectedCountry) {
//     const continent = continents.find(c => c.name === selectedCountry.continent);
//     if (continent) {
//       data.continentId = continent.id; 
//     }
//   }

//   onSubmit(data);
//   onClose();
// };

//   return (
//     <>
//       <div className="modal modal-open">
//         <div className="modal-box bg-(--color-background)">
//           {/* forms */}
//           <form onSubmit={handleSubmit(handleSave)}>
//             <h4 className="font-semibold mb-1 text-lg">Register a Country</h4>
//             <p className="text-xs text-(--color-text)/80 mb-5">
//               Enter the required information below to register a new Country.
//             </p>
//             <Select
//               label="Country"
//               name="name"
//               errors={errors}
//               register={register}
//               options={countryOptions}
//               onChange={(name) => {
//                 const country = countryOptions.find(c => c.name === name) || null;
//                 setSelectedCountry(country);

//                 if (country) {
//                   reset({
//                     name: country.name,
//                     population: country.population,
//                     official_language: country.official_language,
//                     currency: country.currency,
                    
//                   });
//                 }
//               }}
//             />

//             <Input
//               type="number"
//               label="Population"
//               name="population"
//               errors={errors}
//               register={register}
//             />

//              <Input
//               type="text"
//               label="Official Language"
//               name="official_language"
//               errors={errors}
//               register={register}
//             />

//             <Input
//               type="text"
//               label="Currency"
//               name="currency"
//               errors={errors}
//               register={register}
//             />

//              <Input
//               type="text"
//               label="Continent"
//               name="continentId"
//               errors={errors}
//               register={register}
//               value={selectedCountry?.continent ?? ""} 
//             />

//             {/* buttons */}
//             <div className="flex justify-between gap-2">
//               <ButtonCancel onClick={onClose}/>
//               <ButtonSave/>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };
