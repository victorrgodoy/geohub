import CityIcon from '../../components/Icons/CityIcon'
import CountryIcon from '../../components/Icons/CountryIcon'
import ContinentIcon from '../../components/Icons/ContinentIcon'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.css';

const options = [
   { id: 1, title: 'City', icon: CityIcon, path: '/city' },
   { id: 2, title: 'Country', icon: CountryIcon, path: '/country' },
   { id: 3, title: 'Continent', icon: ContinentIcon, path: '/continent' },
]

function SidebarItems(){
    return(
        <div>
            <p className={styles.sidebar__sub__title}>General</p>
            <ul className={styles.sidebar__items}>
                {options.map((op) => (
                    <li key={op.id}> 
                        <NavLink 
                            to={op.path}
                            className={({ isActive }) => isActive ? styles.sidebar__activeLink : styles.sidebar__links}
                        >
                            <op.icon size={18} color="currentColor"/>
                            <span className={styles.sidebar__item}>{op.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SidebarItems;