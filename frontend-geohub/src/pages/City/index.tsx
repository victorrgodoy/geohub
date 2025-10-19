import type { Continent } from '../../api/Continent/continent.types';
import type { Country } from '../../api/Country/country.types';
import { listAllContinent } from '../../api/Continent/continent.api';
import { listAllCountry } from '../../api/Country/country.api';

import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import styles from './City.module.css';
import { useEffect, useState } from 'react';

function City() {
  const [continent, setContinent] = useState<Continent[]>([]);
  const [country, setCountry] = useState<Country[]>([]);

  useEffect(() => {
    listAllContinent().then(setContinent);
    listAllCountry().then(setCountry);
  }, []);

  return (
    <div className={styles.city__body}>
      <Sidebar />
      <Header filterContinent={continent} filterCountry={country} />
    </div>
  );
}

export default City;