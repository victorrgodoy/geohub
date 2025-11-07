import axios from "axios";
import type { WorldBankIndicator, GlobalStats } from "../types/WorldBank";

const WORLD_BANK_API = import.meta.env.VITE_WORLD_BANK_API_URL || "https://api.worldbank.org/v2";

const fetchIndicator = async (indicatorCode: string): Promise<number | null> => {
  try {
    const response = await axios.get<[any, WorldBankIndicator[]]>(
      `${WORLD_BANK_API}/country/WLD/indicator/${indicatorCode}`,
      {
        params: {
          format: "json",
          per_page: 50, 
          date: "2010:2024", 
        },
      }
    );

    const data = response.data[1];
    if (data && data.length > 0) {
      const validData = data.find((item) => item.value !== null && item.value > 0);
      return validData?.value ?? null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching indicator ${indicatorCode}:`, error);
    return null;
  }
};


export const fetchGlobalStats = async (): Promise<GlobalStats | null> => {
  try {
    const [population, gdp, lifeExpectancy, urbanPopulation] = await Promise.all([
      fetchIndicator("SP.POP.TOTL"),
      fetchIndicator("NY.GDP.MKTP.CD"),
      fetchIndicator("SP.DYN.LE00.IN"),
      fetchIndicator("SP.URB.TOTL.IN.ZS"),
    ]);

    if (!gdp) {
      return null;
    }

    return {
      worldPopulation: population || 0,
      globalGDP: gdp,
      lifeExpectancy: lifeExpectancy || 0,
      urbanPopulation: urbanPopulation || 0,
    };
  } catch (error) {
    console.error("Error fetching global stats:", error);
    return null;
  }
};
