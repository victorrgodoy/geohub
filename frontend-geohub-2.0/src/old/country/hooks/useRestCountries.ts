// import { useEffect, useState } from "react";
// import { getAllCountries } from "../api/restCountries";

// export type RestCountry = {
//   name: string;
//   flag: string;
//   continent: string;
//   population: number;
//   currency: string;
//   official_language: string;
// };

// export const useRestCountries = () => {
//   const [countryOptions, setCountryOptions] = useState<RestCountry[]>([]);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await getAllCountries();
//         console.log(response)
//         const data: RestCountry[] = response.map((c: any) => {
//           const languages = Object.values(c.languages ?? {});
//           const currencies = Object.values(c.currencies ?? {});

//           return {
//             name: c.name?.common ?? "Unknown",
//             flag: c.flags?.svg ?? c.flags?.png ?? "",
//             population: c.population ?? 0,
//             official_language: languages[0] ?? "Unknown",
//             currency: (currencies[0] as any)?.name ?? "Unknown",
//            continent:
//             c.region === "Americas"
//               ? c.subregion ?? c.region
//               : c.region ?? "Unknown",
//                   };
//         });
//         setCountryOptions(data);
//       } catch (error) {
//         console.error("Error fetching countries: ", error);
//       }
//     };
//     fetch();
//   }, []);

//   return { countryOptions };
// };
