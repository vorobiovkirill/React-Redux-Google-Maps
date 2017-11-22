import {
	GET_REGIONS_DATA,
	ON_ADDRESS_CLICK,
	ON_CITY_CLICK,
	ON_MAP_LOADED,
	ON_MARKER_CLICK,
	ON_OBLAST_CLICK,
	ON_ZOOM_CHANGED,
} from '../Constants';

export const getRegionsData = (addresses, coordinates) => {
	return {
		type: GET_REGIONS_DATA,
		payload: {
			addresses,
			coordinates,
		},
	};
};

export const onOblastClick = (name) => {
	return {
		type: ON_OBLAST_CLICK,
		payload: {
			name,
		},
	};
};

export const onCityClick = (name) => {
	return {
		type: ON_CITY_CLICK,
		payload: {
			name,
		},
	};
};

export const onAddressClick = (name, center) => {
	return {
		type: ON_ADDRESS_CLICK,
		payload: {
			name,
			center,
		},
	};
};

export const onMarkerClick = ({ center, index }) => {
	return {
		type: ON_MARKER_CLICK,
		payload: {
			center,
			index,
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

