import axios from "axios";

// Altitude === Elevation
type ElevationData = {
  elevation: number | undefined,
}

export async function fetchAltitude(latitude: number | undefined , longitude: number | undefined): Promise<ElevationData> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=AIzaSyDc33LO8k0EG4cMyhWGOKKJncNR0CqnRnQ`)
  const altitude = res.data.results[0].elevation

  return altitude;
}