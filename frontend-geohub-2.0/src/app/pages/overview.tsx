import Card from "../../components/card";

const city = {
  name: "Tokyo",
  country: "Japan",
  continent: "Asia", 
  latitude: "35.6895° N",
  longitude: "139.6917° E",
  population: "37,000,000"
};

function Overview(){
    return(
        <div className="p-8">
            <Card
                title={city.name} 
                value={city.population} 
                info={city.country}/>
        </div>
    )
}

export default Overview;