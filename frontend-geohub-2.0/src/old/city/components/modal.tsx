// import { useForm } from "react-hook-form";
// import type { City } from "../api/city";
// import { useEffect } from "react";

// //  id:number
// //   name: string;
// //   population: number;
// //   latitude: number;
// //   longitude: number;
// type Props = {
//   onClose: () => void;
//   onSubmit: (city: City) => void;
//   initialData?: City;
// };

// export const ModalCity = ({ onClose, onSubmit, initialData }: Props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<City>();

//   useEffect(() => {
//     if (initialData) {
//       reset(initialData);
//     } else {
//       reset({
//         name: "",
//         population: 0,
//         latitude: 0,
//         longitude: 0,
//         country_id: 0,
//       });
//     }
//   }, [initialData, reset]);

//   const handleSave = (data: City) => {
//     onSubmit(data);
//     onClose();
//   };

//   return (
//     <>
//       <div className="modal modal-open">
//         <div className="modal-box w-fit bg-(--color-background)">
//           {/* forms */}
//           <form onSubmit={handleSubmit(handleSave)}>
//             <h4 className="font-semibold mb-1 text-lg">Register a City</h4>
//             <p className="text-xs text-(--color-text)/80 mb-5">
//               Enter the required information below to register a new City.
//             </p>

//             {/* option 1 */}
//             <div className="flex flex-col gap-1 mb-6">
//               <label className="text-sm font-medium text-(--color-text)/90">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className={`
//                   border h-8 w-full p-3 text-sm rounded-md 
//                   placeholder-gray-400 
//                   transition-all duration-300 focus:outline-none 
//                   ${
//                     errors?.name
//                       ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
//                       : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//                   }
//                 `}
//                 {...register("name", { required: true })}
//               />

//               {errors?.name?.type === "required" && (
//                 <p className="text-xs text-red-400">Name is required.</p>
//               )}
//             </div>

//             {/* option 2 */}
//             <div className="flex flex-col gap-1 mb-6">
//               <label className="text-sm font-medium text-(--color-text)/90">
//                 Population
//               </label>
//               <input
//                 type="number"
//                 placeholder="Population"
//                 className={`
//                   border h-8 w-full p-3 text-sm rounded-md 
//                   placeholder-gray-400 
//                   transition-all duration-300 focus:outline-none 
//                   ${
//                     errors?.population
//                       ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
//                       : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//                   }
//                 `}
//                 {...register("population", { required: true })}
//               />

//               {errors?.population?.type === "required" && (
//                 <p className="text-xs text-red-400">Population is required.</p>
//               )}
//             </div>

//             {/* option 3 */}
//             <div className="flex flex-col gap-1 mb-6">
//               <label className="text-sm font-medium text-(--color-text)/90">
//                 Latitude
//               </label>
//               <input
//                 type="number"
//                 placeholder="Latitude"
//                 className={`
//                   border h-8 w-full p-3 text-sm rounded-md 
//                   placeholder-gray-400 
//                   transition-all duration-300 focus:outline-none 
//                   ${
//                     errors?.latitude
//                       ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
//                       : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//                   }
//                 `}
//                 {...register("latitude", { required: true })}
//               />

//               {errors?.latitude?.type === "required" && (
//                 <p className="text-xs text-red-400">Latitude is required.</p>
//               )}
//             </div>

//             {/* option 4 */}
//             <div className="flex flex-col gap-1 mb-6">
//               <label className="text-sm font-medium text-(--color-text)/90">
//                 Longitude
//               </label>
//               <input
//                 type="number"
//                 placeholder="Longitude"
//                 className={`
//                   border h-8 w-full p-3 text-sm rounded-md 
//                   placeholder-gray-400 
//                   transition-all duration-300 focus:outline-none 
//                   ${
//                     errors?.longitude
//                       ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-300"
//                       : "border-(--color-text)/30 focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
//                   }
//                 `}
//                 {...register("longitude", { required: true })}
//               />

//               {errors?.longitude?.type === "required" && (
//                 <p className="text-xs text-red-400">Longitude is required.</p>
//               )}
//             </div>

//             {/* buttons */}
//             <div className="flex justify-between gap-2">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="
//                   py-1.5 w-full rounded-sm text-xs border font-semibold
//                   cursor-pointer text-(--color-text)
//                   active:bg-[--color-primary]/70 active:scale-97 transition  
//                   border-(--color-text)/30 shadow-xs 
//                 "
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="
//                 bg-blue-700/95 py-1.5 w-full rounded-sm 
//                   text-xs font-semibold
//                   cursor-pointer text-white hover:bg-blue-700 
//                   active:bg-[--color-primary]/70 active:scale-97 transition  
//                   "
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };
