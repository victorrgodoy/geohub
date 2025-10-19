import SidebarDashboard from '../components/SidebarDashboard'
import ButtonSave from '../components/buttons/ButtonSave'
import InputSearch from '../components/input/InputSearch'

function Continent() {
   return (
      <div className="flex gap-x-10 h-screen">
         <SidebarDashboard />
         <main className="flex-1">
            <header className="flex items-center justify-between py-10">
               <div className="w-40">
                  <InputSearch title="Search Continents" />
               </div>
               <div className="flex gap-x-4">
                  <ButtonSave />
               </div>
            </header>
            <hr className="text-gray-300" />
         </main>
      </div>
   )
}

export default Continent
