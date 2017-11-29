import {
	GET_ALL_CASHDESKS,
	GET_CASHDESKS_DATA,
	GET_CITIES_DATA,
	GET_REGIONS_DATA,
	ON_ADDRESS_CLICK,
	ON_CITY_CLICK,
	ON_MAP_LOADED,
	ON_MARKER_CLICK,
	ON_OBLAST_CLICK,
	ON_ZOOM_CHANGED,
} from '../constants';

export const getRegionsData = (regions) => {
	return {
		type: GET_REGIONS_DATA,
		payload: {
			regions,
		},
	};
};

export const getCitiesData = (cities, regionId) => {
	return {
		type: GET_CITIES_DATA,
		payload: {
			cities,
			regionId,
		},
	};
};

export const getCashdesksData = (city, regionId, cityId, cashdesks) => {
	return {
		type: GET_CASHDESKS_DATA,
		payload: {
			city,
			regionId,
			cityId,
			cashdesks,
		},
	};
};

export const getAllCashdesks = (coordinates) => {
	return {
		type: GET_ALL_CASHDESKS,
		payload: {
			coordinates,
		},
	};
};


export const onOblastClick = (regionId) => {
	return {
		type: ON_OBLAST_CLICK,
		payload: {
			regionId,
		},
	};
};

export const onCityClick = (regionId, cityId) => {
	return {
		type: ON_CITY_CLICK,
		payload: {
			regionId,
			cityId,
		},
	};
};

export const onAddressClick = (cashdeskId, center) => {
	return {
		type: ON_ADDRESS_CLICK,
		payload: {
			cashdeskId,
			center,
		},
	};
};

export const onMarkerClick = (cashdeskId, center) => {
	return {
		type: ON_MARKER_CLICK,
		payload: {
			cashdeskId,
			center,
		},
	};
};

export const onMapLoaded = (map) => {
	return {
		type: ON_MAP_LOADED,
		payload: {
			map,
		},
	};
};

export const onZoomChange = (zoom) => {
	return {
		type: ON_ZOOM_CHANGED,
		payload: {
			zoom,
		},
	};
};
