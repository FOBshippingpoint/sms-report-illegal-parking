import { json } from '@sveltejs/kit';
import { GEOCODING_API_KEY } from '$env/static/private';

export async function GET({ url }) {
	const latlng = url.searchParams.get('latlng');
	const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${GEOCODING_API_KEY}&location_type=ROOFTOP&language=zh-TW`;
	const response = await fetch(geoUrl);
	const data = await response.json();

	const addresses = data.results.map((result) => result.formatted_address);

	return json({ addresses });
}
