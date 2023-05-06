import { ChangeEvent, FormEvent, useState} from "react";
import { fetchGeocode } from "../api/geocode";
import { useQuery } from "@tanstack/react-query";
import wait from "../utils/wait";

function SearchBox() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const geocodeQuery = useQuery({
    queryKey: ["geocode", searchQuery],
    queryFn: () => fetchGeocode(searchQuery).catch(console.error),
  })

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    wait(1200)
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(geocodeQuery.data);
  }

  // geocodeQuery.fetchStatus === "idle"
  // geocodeQuery.status === "success"

  // if (geocodeQuery.isLoading) {
  //   return <p>Loading</p>
  // }

  if (geocodeQuery.isError) {
    return <h1>{JSON.stringify(geocodeQuery.error)}</h1>
  } 

  return (
    <div>
      <p>Longitude: {geocodeQuery.data?.longitude}</p>
      <p>Latitude: {geocodeQuery.data?.latitude}</p>
      <p>Altitude: na</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Search an address...' value={searchQuery} onChange={handleSearch} />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBox;