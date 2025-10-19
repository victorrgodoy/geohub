import CityIcon from './icons/CityIcon'
import CountryIcon from './icons/CountryIcon'
import ContinentIcon from './icons/ContinentIcon'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionNavLink = motion(NavLink)

const options = [
   { id: 1, title: 'City', icon: CityIcon, path: '/city' },
   { id: 2, title: 'Country', icon: CountryIcon, path: '/country' },
   { id: 3, title: 'Continent', icon: ContinentIcon, path: '/continent' },
]

function SidebarDashboard() {
   return (
      <aside
        className="
            bg-[var(--color--sidebar)] h-full lg:w-[224px] px-5 py-10 
            flex flex-col justify-between
        ">
         <div>
            <div className="flex gap-x-3 mb-36 items-center">
               <img src="src/assets/geohub_logo.svg" alt="Geohub Logo" className="w-8 h-auto" />
               <p className="hidden lg:inline text-[var(--color--text)] font-medium text-lg ">Geohub</p>
            </div>
            <div>
               <p className="text-[var(--color--text--3)] mb-3 text-sm">General</p>
               <ul className="text-[var(--color--text)] text-sm">
                  {options.map((op) => (
                     <li key={op.id}>
                        <MotionNavLink
                           to={op.path}
                           className={({ isActive }) =>
                              `flex items-center gap-x-3 mb-2.5 px-3 py-2 rounded-md cursor-pointer
                        ${isActive ? 'bg-[var(--color--primary)] text-[var(--color--text--2)]' : 'text-[var(--color--text--3)]'}`
                           }
                           whileHover={{
                              scale: 1.03,
                              backgroundColor: 'var(--color--primary)',
                              color: 'var(--color--text--2)',
                              transition: { duration: 0.3, ease: 'easeInOut' },
                           }}
                        >
                           <op.icon size={18} color="currentColor" />
                           <span className="hidden lg:inline font-medium">{op.title}</span>
                        </MotionNavLink>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </aside>
   )
}

export default SidebarDashboard
