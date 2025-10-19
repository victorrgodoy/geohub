import SidebarDashboard from '../components/SidebarDashboard'
import Footer from '../components/Footer'
import ButtonFilterContinent from '../components/buttons/ButtonFilterContinent'
import ButtonFilterCity from '../components/buttons/ButtonFilterCountry'
import InputSearch from '../components/input/InputSearch'
import ButtonSave from '../components/buttons/ButtonSave'
import TableDashboard from '../components/TableDashboard'
import { type TableProps } from 'antd'
import type CityInterface from '../interfaces/CityInterface'

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica']
const countries = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica']

const cities: CityInterface[] = [
   { id: '1', name: 'São Paulo', country: 'Brazil', population: 12300000, latitude: -23.55, longitude: -46.63 },
   { id: '2', name: 'Rio de Janeiro', country: 'Brazil', population: 6748000, latitude: -22.91, longitude: -43.17 },
   { id: '3', name: 'New York', country: 'USA', population: 8419000, latitude: 40.71, longitude: -74.01 },
   { id: '4', name: 'Los Angeles', country: 'USA', population: 3980000, latitude: 34.05, longitude: -118.24 },
   { id: '5', name: 'London', country: 'UK', population: 8982000, latitude: 51.51, longitude: -0.13 },
   { id: '6', name: 'Paris', country: 'France', population: 2148000, latitude: 48.85, longitude: 2.35 },
   { id: '7', name: 'Tokyo', country: 'Japan', population: 13929000, latitude: 35.68, longitude: 139.69 },
   { id: '8', name: 'Sydney', country: 'Australia', population: 5312000, latitude: -33.87, longitude: 151.21 },
   { id: '9', name: 'Cairo', country: 'Egypt', population: 10230000, latitude: 30.03, longitude: 31.23 },
   { id: '10', name: 'Moscow', country: 'Russia', population: 11920000, latitude: 55.75, longitude: 37.62 },
   { id: '11', name: 'Berlin', country: 'Germany', population: 3769000, latitude: 52.52, longitude: 13.4 },
   { id: '12', name: 'Toronto', country: 'Canada', population: 2930000, latitude: 43.65, longitude: -79.38 },
]

const columns: TableProps<CityInterface>['columns'] = [
   { title: 'Name', dataIndex: 'name', key: 'name' },
   { title: 'Country', dataIndex: 'country', key: 'country' },
   { title: 'Population', dataIndex: 'population', key: 'population' },
   { title: 'Latitude', dataIndex: 'latitude', key: 'latitude' },
   { title: 'Longitude', dataIndex: 'longitude', key: 'longitude' },
]

function City() {
   return (
      <div className="flex gap-x-10 h-screen">
         <SidebarDashboard />
         <main className="flex-1 flex flex-col justify-between py-10">
            <div>
            <header className="flex items-center justify-between mb-10">
               <div className="w-40">
                  <InputSearch title="Search Cities" />
               </div>
               <div className="flex gap-x-4">
                  <ButtonFilterContinent continents={continents} />
                  <ButtonFilterCity countries={countries} />
                  <ButtonSave />
               </div>
            </header>

            <hr className="text-gray-300 mb-10" />

            <section>
               <div className="flex justify-end gap-x-4 text-sm mb-5">
                  <p>Filter: </p>
                  <p>Brasil</p>
                  <p>América do Sul</p>
                  <button>Clear</button>
               </div>
               <TableDashboard columns={columns} data={cities} />
            </section>
            </div>

            <Footer/>
         </main>
      </div>
   )
}

export default City
