import SidebarItems from "./SidebarItems"
import Logo from "../../components/Icons/LogoIcon";
import styles from './Sidebar.module.css';

function Sidebar() {
   return (
      <aside className={styles.sidebar__body}>
         <div>
            <div className={styles.sidebar__title}>
               <Logo width={24} height={24}/>
               <h2>Geohub</h2>
            </div>
            <SidebarItems/>
         </div>
         <p className={styles.sidebar__footer}>© 2025 Geohub</p>
      </aside>
   )
}

export default Sidebar;