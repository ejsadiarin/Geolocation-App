import axios from 'axios';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

type GeocodeData = {
  longitude: number | undefined,
  latitude: number | undefined,
  place_name?: string | undefined,
  formatted_address?: string | undefined,
}

// FROM MAPBOX GEOCODE API - 100,000 free requests per month
export async function fetchGeocode(searchQuery: string | undefined): Promise<GeocodeData> {
  const res = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?country=ph&proximity=ip&limit=1&access_token=${accessToken}`)

  const features = res.data.features;
  if (!features || features.length === 0) {
    throw new Error('No geocode data found');
  }

  const geocode = features[0].geometry?.coordinates;
  if (!geocode || geocode.length < 2) {
    throw new Error('Invalid geocode data');
  }

  const longitude = geocode[0].toFixed(4);
  const latitude = geocode[1].toFixed(4);
  const place_name = features[0].place_name;
 
  return { longitude, latitude, place_name };
}

// FROM GOOGLE GEOCODE API - more accurate and better overall
export async function fetchGeocodeData(searchQuery: string | undefined): Promise<GeocodeData> {
  const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${apiKey}`)
  const resultsData = res.data.results[0]
  const geocode = resultsData.geometry.location
  const latitude = geocode.lat
  const longitude = geocode.lng
  const formatted_address = resultsData.formatted_address
  // TODO: error handling

  return { latitude, longitude, formatted_address }
}