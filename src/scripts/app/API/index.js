import {
	CASHDESKS_BY_CITY_URL,
	CITIES_BY_REGIONS_URL,
	REGIONS_URL,
} from '../constants/Constants';

const fetchAllRegions = () =>
	fetch(REGIONS_URL, { method: 'GET', credentials: 'include' })
		.then((response) => response.json())
		// .then(regions => regions)
		.catch(error => console.error(error));

const fetchCitiesByRegions = (regionId) =>
	fetch(`${CITIES_BY_REGIONS_URL}${regionId}`, { method: 'GET', credentials: 'include' })
		.then((response) => response.json())
		// .then(cities => cities)
		.catch(error => console.error(error));

const fetchCashDesksByCity = (cityId) =>
	fetch(`${CASHDESKS_BY_CITY_URL}${cityId}`, { method: 'GET', credentials: 'include' })
		.then((response) => response.json())
		// .then(cashdesk => cashdesk)
		.catch(error => console.error(error));

const fetchAllCashdesks = () =>
	fetch(CASHDESKS_BY_CITY_URL, { method: 'GET', credentials: 'include' })
		.then((response) => response.json())
		// .then(coordinates => coordinates)
		.catch(error => console.error(error));


const API = {
	fetchAllRegions,
	fetchCitiesByRegions,
	fetchCashDesksByCity,
	fetchAllCashdesks,
};

export default API;
