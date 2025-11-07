import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../database/prisma.service';

interface CityData {
  name: string;
  countryName: string;
  population: number;
  latitude: number;
  longitude: number;
}

const cities: CityData[] = [
  // Brasil
  { name: 'São Paulo', countryName: 'Brazil', population: 12300000, latitude: -23.5505, longitude: -46.6333 },
  { name: 'Rio de Janeiro', countryName: 'Brazil', population: 6748000, latitude: -22.9068, longitude: -43.1729 },
  { name: 'Brasília', countryName: 'Brazil', population: 3055000, latitude: -15.8267, longitude: -47.9218 },
  
  // Estados Unidos
  { name: 'New York', countryName: 'United States', population: 8336000, latitude: 40.7128, longitude: -74.0060 },
  { name: 'Los Angeles', countryName: 'United States', population: 3980000, latitude: 34.0522, longitude: -118.2437 },
  { name: 'Chicago', countryName: 'United States', population: 2716000, latitude: 41.8781, longitude: -87.6298 },
  
  // China
  { name: 'Shanghai', countryName: 'China', population: 24870000, latitude: 31.2304, longitude: 121.4737 },
  { name: 'Beijing', countryName: 'China', population: 21540000, latitude: 39.9042, longitude: 116.4074 },
  { name: 'Guangzhou', countryName: 'China', population: 13080000, latitude: 23.1291, longitude: 113.2644 },
  
  // Índia
  { name: 'Mumbai', countryName: 'India', population: 20411000, latitude: 19.0760, longitude: 72.8777 },
  { name: 'Delhi', countryName: 'India', population: 16753000, latitude: 28.7041, longitude: 77.1025 },
  { name: 'Bangalore', countryName: 'India', population: 8443000, latitude: 12.9716, longitude: 77.5946 },
  
  // Japão
  { name: 'Tokyo', countryName: 'Japan', population: 13960000, latitude: 35.6762, longitude: 139.6503 },
  { name: 'Osaka', countryName: 'Japan', population: 2725000, latitude: 34.6937, longitude: 135.5023 },
  { name: 'Yokohama', countryName: 'Japan', population: 3749000, latitude: 35.4437, longitude: 139.6380 },
  
  // Reino Unido
  { name: 'London', countryName: 'United Kingdom', population: 8982000, latitude: 51.5074, longitude: -0.1278 },
  { name: 'Birmingham', countryName: 'United Kingdom', population: 1141000, latitude: 52.4862, longitude: -1.8904 },
  { name: 'Manchester', countryName: 'United Kingdom', population: 547000, latitude: 53.4808, longitude: -2.2426 },
  
  // França
  { name: 'Paris', countryName: 'France', population: 2161000, latitude: 48.8566, longitude: 2.3522 },
  { name: 'Marseille', countryName: 'France', population: 870000, latitude: 43.2965, longitude: 5.3698 },
  { name: 'Lyon', countryName: 'France', population: 513000, latitude: 45.7640, longitude: 4.8357 },
  
  // Alemanha
  { name: 'Berlin', countryName: 'Germany', population: 3645000, latitude: 52.5200, longitude: 13.4050 },
  { name: 'Hamburg', countryName: 'Germany', population: 1841000, latitude: 53.5511, longitude: 9.9937 },
  { name: 'Munich', countryName: 'Germany', population: 1472000, latitude: 48.1351, longitude: 11.5820 },
  
  // Itália
  { name: 'Rome', countryName: 'Italy', population: 2873000, latitude: 41.9028, longitude: 12.4964 },
  { name: 'Milan', countryName: 'Italy', population: 1352000, latitude: 45.4642, longitude: 9.1900 },
  { name: 'Naples', countryName: 'Italy', population: 967000, latitude: 40.8518, longitude: 14.2681 },
  
  // Espanha
  { name: 'Madrid', countryName: 'Spain', population: 3223000, latitude: 40.4168, longitude: -3.7038 },
  { name: 'Barcelona', countryName: 'Spain', population: 1621000, latitude: 41.3851, longitude: 2.1734 },
  { name: 'Valencia', countryName: 'Spain', population: 792000, latitude: 39.4699, longitude: -0.3763 },
  
  // Rússia
  { name: 'Moscow', countryName: 'Russia', population: 12506000, latitude: 55.7558, longitude: 37.6173 },
  { name: 'Saint Petersburg', countryName: 'Russia', population: 5384000, latitude: 59.9343, longitude: 30.3351 },
  
  // Canadá
  { name: 'Toronto', countryName: 'Canada', population: 2731000, latitude: 43.6532, longitude: -79.3832 },
  { name: 'Montreal', countryName: 'Canada', population: 1705000, latitude: 45.5017, longitude: -73.5673 },
  { name: 'Vancouver', countryName: 'Canada', population: 631000, latitude: 49.2827, longitude: -123.1207 },
  
  // México
  { name: 'Mexico City', countryName: 'Mexico', population: 8918000, latitude: 19.4326, longitude: -99.1332 },
  { name: 'Guadalajara', countryName: 'Mexico', population: 1495000, latitude: 20.6597, longitude: -103.3496 },
  { name: 'Monterrey', countryName: 'Mexico', population: 1135000, latitude: 25.6866, longitude: -100.3161 },
  
  // Argentina
  { name: 'Buenos Aires', countryName: 'Argentina', population: 3054000, latitude: -34.6037, longitude: -58.3816 },
  { name: 'Córdoba', countryName: 'Argentina', population: 1391000, latitude: -31.4201, longitude: -64.1888 },
  
  // Austrália
  { name: 'Sydney', countryName: 'Australia', population: 5312000, latitude: -33.8688, longitude: 151.2093 },
  { name: 'Melbourne', countryName: 'Australia', population: 4936000, latitude: -37.8136, longitude: 144.9631 },
  { name: 'Brisbane', countryName: 'Australia', population: 2462000, latitude: -27.4698, longitude: 153.0251 },
  
  // África do Sul
  { name: 'Johannesburg', countryName: 'South Africa', population: 5635000, latitude: -26.2041, longitude: 28.0473 },
  { name: 'Cape Town', countryName: 'South Africa', population: 4618000, latitude: -33.9249, longitude: 18.4241 },
  
  // Egito
  { name: 'Cairo', countryName: 'Egypt', population: 9540000, latitude: 30.0444, longitude: 31.2357 },
  { name: 'Alexandria', countryName: 'Egypt', population: 5200000, latitude: 31.2001, longitude: 29.9187 },
  
  // Coreia do Sul
  { name: 'Seoul', countryName: 'South Korea', population: 9776000, latitude: 37.5665, longitude: 126.9780 },
  { name: 'Busan', countryName: 'South Korea', population: 3414000, latitude: 35.1796, longitude: 129.0756 },
  
  // Turquia
  { name: 'Istanbul', countryName: 'Turkey', population: 15462000, latitude: 41.0082, longitude: 28.9784 },
  { name: 'Ankara', countryName: 'Turkey', population: 5503000, latitude: 39.9334, longitude: 32.8597 },
  
  // Tailândia
  { name: 'Bangkok', countryName: 'Thailand', population: 10539000, latitude: 13.7563, longitude: 100.5018 },
  
  // Indonésia
  { name: 'Jakarta', countryName: 'Indonesia', population: 10562000, latitude: -6.2088, longitude: 106.8456 },
  
  // Filipinas
  { name: 'Manila', countryName: 'Philippines', population: 1780000, latitude: 14.5995, longitude: 120.9842 },
  
  // Vietnã
  { name: 'Ho Chi Minh City', countryName: 'Vietnam', population: 8993000, latitude: 10.8231, longitude: 106.6297 },
  { name: 'Hanoi', countryName: 'Vietnam', population: 8053000, latitude: 21.0285, longitude: 105.8542 },
  
  // Paquistão
  { name: 'Karachi', countryName: 'Pakistan', population: 14910000, latitude: 24.8607, longitude: 67.0011 },
  { name: 'Lahore', countryName: 'Pakistan', population: 11126000, latitude: 31.5204, longitude: 74.3587 },
  
  // Bangladesh
  { name: 'Dhaka', countryName: 'Bangladesh', population: 21006000, latitude: 23.8103, longitude: 90.4125 },
  
  // Nigéria
  { name: 'Lagos', countryName: 'Nigeria', population: 14368000, latitude: 6.5244, longitude: 3.3792 },
  
  // Colômbia
  { name: 'Bogotá', countryName: 'Colombia', population: 7412000, latitude: 4.7110, longitude: -74.0721 },
  
  // Chile
  { name: 'Santiago', countryName: 'Chile', population: 5614000, latitude: -33.4489, longitude: -70.6693 },
  
  // Peru
  { name: 'Lima', countryName: 'Peru', population: 9674000, latitude: -12.0464, longitude: -77.0428 },
  
  // Portugal
  { name: 'Lisbon', countryName: 'Portugal', population: 505000, latitude: 38.7223, longitude: -9.1393 },
  
  // Países Baixos
  { name: 'Amsterdam', countryName: 'Netherlands', population: 821000, latitude: 52.3676, longitude: 4.9041 },
  
  // Bélgica
  { name: 'Brussels', countryName: 'Belgium', population: 1209000, latitude: 50.8503, longitude: 4.3517 },
  
  // Áustria
  { name: 'Vienna', countryName: 'Austria', population: 1911000, latitude: 48.2082, longitude: 16.3738 },
  
  // Suíça
  { name: 'Zurich', countryName: 'Switzerland', population: 402000, latitude: 47.3769, longitude: 8.5417 },
  
  // Suécia
  { name: 'Stockholm', countryName: 'Sweden', population: 975000, latitude: 59.3293, longitude: 18.0686 },
  
  // Noruega
  { name: 'Oslo', countryName: 'Norway', population: 697000, latitude: 59.9139, longitude: 10.7522 },
  
  // Dinamarca
  { name: 'Copenhagen', countryName: 'Denmark', population: 799000, latitude: 55.6761, longitude: 12.5683 },
  
  // Polônia
  { name: 'Warsaw', countryName: 'Poland', population: 1790000, latitude: 52.2297, longitude: 21.0122 },
  
  // Grécia
  { name: 'Athens', countryName: 'Greece', population: 664000, latitude: 37.9838, longitude: 23.7275 },
  
  // República Tcheca
  { name: 'Prague', countryName: 'Czechia', population: 1309000, latitude: 50.0755, longitude: 14.4378 },
  
  // Hungria
  { name: 'Budapest', countryName: 'Hungary', population: 1752000, latitude: 47.4979, longitude: 19.0402 },
  
  // Romênia
  { name: 'Bucharest', countryName: 'Romania', population: 1821000, latitude: 44.4268, longitude: 26.1025 },
  
  // Ucrânia
  { name: 'Kyiv', countryName: 'Ukraine', population: 2952000, latitude: 50.4501, longitude: 30.5234 },
  
  // Arábia Saudita
  { name: 'Riyadh', countryName: 'Saudi Arabia', population: 7676000, latitude: 24.7136, longitude: 46.6753 },
  
  // Emirados Árabes
  { name: 'Dubai', countryName: 'United Arab Emirates', population: 3331000, latitude: 25.2048, longitude: 55.2708 },
  
  // Israel
  { name: 'Tel Aviv', countryName: 'Israel', population: 460000, latitude: 32.0853, longitude: 34.7818 },
  
  // Irã
  { name: 'Tehran', countryName: 'Iran', population: 8896000, latitude: 35.6892, longitude: 51.3890 },
  
  // Iraque
  { name: 'Baghdad', countryName: 'Iraq', population: 7144000, latitude: 33.3152, longitude: 44.3661 },
  
  // Quênia
  { name: 'Nairobi', countryName: 'Kenya', population: 4922000, latitude: -1.2864, longitude: 36.8172 },
  
  // Etiópia
  { name: 'Addis Ababa', countryName: 'Ethiopia', population: 3273000, latitude: 9.0320, longitude: 38.7469 },
  
  // Marrocos
  { name: 'Casablanca', countryName: 'Morocco', population: 3752000, latitude: 33.5731, longitude: -7.5898 },
];

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prisma = appContext.get(PrismaService);

  console.log(`Starting to import ${cities.length} cities...\n`);

  let imported = 0;
  let skipped = 0;

  for (const cityData of cities) {
    try {
      const country = await prisma.country.findFirst({
        where: { cou_name: cityData.countryName },
      });

      if (!country) {
        console.warn(`⚠️  Country "${cityData.countryName}" not found for ${cityData.name}`);
        skipped++;
        continue;
      }

      const cityName = `${cityData.name}, ${cityData.countryName}`;

      await prisma.city.upsert({
        where: { cit_name: cityName },
        update: {},
        create: {
          cit_name: cityName,
          cit_population: cityData.population,
          cit_latitude: cityData.latitude,
          cit_longitude: cityData.longitude,
          cou_id: country.cou_id,
        },
      });

      imported++;
      if (imported % 10 === 0) {
        console.log(`  ✓ ${imported} cities imported...`);
      }
    } catch (error) {
      console.error(` Error importing ${cityData.name}:`, error.message);
      skipped++;
    }
  }

  console.log(`\nImport completed!`);
  console.log(`   Cities imported: ${imported}`);
  console.log(`   Cities skipped: ${skipped}`);
  await appContext.close();
}

bootstrap().catch(console.error);
