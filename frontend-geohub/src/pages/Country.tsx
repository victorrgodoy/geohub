import SidebarDashboard from '../components/SidebarDashboard'
import ButtonFilterContinent from '../components/buttons/ButtonFilterContinent'
import InputSearch from '../components/input/InputSearch'
import ButtonSave from '../components/buttons/ButtonSave'

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica']

function Country() {
   return (
      <div className="flex gap-x-10 h-screen">
         <SidebarDashboard />
         <main className="flex-1">
            <header className="flex items-center justify-between py-10">
               <div className="w-40">
                  <InputSearch title="Search Countries" />
               </div>
               <div className="flex gap-x-4">
                  <ButtonFilterContinent continents={continents} />
                  <ButtonSave />
               </div>
            </header>
            <hr className="text-gray-300" />
         </main>
      </div>
   )
}

export default Country
