import Card from "../../features/dashboard/components/card";
import Donut from "../../features/dashboard/components/donut";
import Table from "../../components/table";

import { useDashboard } from "../../features/dashboard/hooks/useDashboard";
import { formatDate } from "../../lib/formatDate";
import { formatNumber } from "../../lib/formatNumber";

const columnsTableCity = [
  { key: "name", label: "Name" },
  { key: "population", label: "Population" },
  { key: "latitude", label: "Latitude" },
  { key: "longitude", label: "Longitude" },
];

const columnsTableCountry = [
  { key: "name", label: "Name"},
  { key: "population", label: "Population" },
  { key: "official_language", label: "Official Language" },
  { key: "currency", label: "Currency" },
];

function Dashboard(){
  const { totalCity, totalCountry, totalPopulation, top5City, top5Country } = useDashboard();
  console.log(top5Country)
    return(
        <div className="p-8 flex flex-col md:grid grid-cols-3 gap-14">
          <div className="col-span-3 sm:flex border-[0.5px] border-r-0 rounded-md border-(--color-border)">
          <Card
              title={"Total Population"} 
              value={formatNumber(totalPopulation?.total)}
              value_title={formatDate(totalPopulation?.updatedAt ?? null)}
              />
                        
              <Card
                  title={"Total Countries"} 
                  value={formatNumber(totalCountry?.total)}
                  value_title={formatDate(totalCountry?.updatedAt ?? null)}
                />
                <Card
                  title={"Total Cities"} 
                  value={formatNumber(totalCity?.total)}
                  value_title={formatDate(totalCity?.updatedAt ?? null)}
                />
              </div>

          {/* section 2 */}
          <div className="border-[0.5px] shadow-sm border-(--color-border) col-span-3 rounded-md h-fit">
            <h3 className="p-6 font-medium lg:text-lg">
              Top 5 Most Populated Countries
            </h3>
            <Table columns={columnsTableCountry} data={top5Country}/>
          </div>

          {/* section 3 */}
         <div className="border-[0.5px] shadow-sm border-(--color-border) col-span-1  rounded-md pb-6">
            <h3 className="p-6 font-medium lg:text-lg">
              Population by Continent
            </h3>
           <div className="p-6 w-full h-64 flex sm:flex-row justify-center"><Donut/></div>
          </div>
            <div className="border-[0.5px] shadow-sm border-(--color-border) col-span-2 rounded-md h-fit">
            <h3 className="p-6 font-medium lg:text-lg">
              Top 5 Most Populated Cities
            </h3>
            <Table columns={columnsTableCity} data={top5City}/>
          </div>
        </div>
    )
}

export default Dashboard;