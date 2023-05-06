import axios from "axios";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

// Altitude === Elevation
type ElevationData = {
  elevation: number | undefined,
}

export async function fetchAltitude(latitude: number | undefined , longitude: number | undefined): Promise<ElevationData> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`)
  const altitude = res.data.results[0].elevation

  return altitude;
}