import InputSearch from "../../components/InputSearch";
import DropdownFilter from "../../components/DropdownFilter";
import styles from './Header.module.css'
import type { Continent } from "../../api/Continent/continent.types";
import type { Country } from "../../api/Country/country.types";
import type { MenuProps } from "antd";

type HeaderProps = {
  filterContinent: Continent[];
  filterCountry: Country[];
}
function Header({filterContinent, filterCountry}: HeaderProps) {

  const continents: MenuProps['items'] = filterContinent.map((item) => ({
    key: item.id,
    label: item.name,
  }));

  const countries: MenuProps['items'] = filterCountry.map((item) => ({
    key: item.id,
    label: item.name,
  }));

   return (
      <header className={styles.header__container}>
        <InputSearch title="Search"/>
        <div className={styles.header__button__container}>
         <DropdownFilter title="Continent" items={continents}/>
         <DropdownFilter title="Country" items={countries}/>
        </div>
      </header>
   )
}

export default Header;


