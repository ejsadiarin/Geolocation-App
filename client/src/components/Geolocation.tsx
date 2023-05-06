
import { ChangeEvent, FormEvent, useState } from "react";
import { fetchGeocode, fetchGeocodeData } from "../api/geocode";
import { fetchAltitude } from "../api/elevation";

export default function Geolocation() {
  const [searchQuery, setSearchQuery] = useState("");  
  const [longitude, setLongitude] = useState<number | undefined>(undefined);
  const [latitude, setLatitude] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [altitude, setAltitude] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const geocodeData = await fetchGeocodeData(searchQuery);
      console.log(geocodeData);
      setLongitude(geocodeData.longitude);
      setLatitude(geocodeData.latitude);
      setAddress(geocodeData.place_name || geocodeData.formatted_address);

      // const altitudeData = await fetchAltitude(geocodeData.latitude, geocodeData.longitude)
      // console.log(altitudeData);
      // setAltitude(altitudeData.elevation)

    } catch (error) {
      console.error(error);
    } 

    setIsLoading(false);
  }

  function handleQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
   <div>
    <p>{isLoading ? "Fetching place..." : address || searchQuery}</p>
    <p>Longitude: {isLoading ? "Fetching..." : longitude}</p>
    <p>Latitude: {isLoading ? "Fetching..." : latitude}</p>
    <p>Altitude: {isLoading ? "Fetching..." : altitude}</p>
    <form onSubmit={handleSearch}>
      <input type="text" placeholder="Search..." value={searchQuery} onChange={handleQueryChange} />  
      <button type="submit">Search</button>  
    </form> 
   </div> 
  );

}