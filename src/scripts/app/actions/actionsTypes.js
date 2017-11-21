// export const ON_MARKER_CLICK = 'ON_MARKER_CLICK';
// export const ON_OBLAST_CLICK = 'ON_OBLAST_CLICK';
// export const ON_CITY_CLICK = 'ON_CITY_CLICK';
// export const ON_ADDRESS_CLICK = 'ON_ADDRESS_CLICK';
// export const ON_ZOOM_CHANGED = 'ON_ZOOM_CHANGED';
// export const ON_POINT_CLICK = 'ON_POINT_CLICK';
// export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';

import {
	GET_REGIONS_DATA,
	ON_ADDRESS_CLICK,
	ON_CITY_CLICK,
	ON_MARKER_CLICK,
	ON_OBLAST_CLICK,
	ON_POINT_CLICK,
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

export const onMarkerClick = ({ center, index }) => {
	return {
		type: ON_MARKER_CLICK,
		payload: {
			center,
			index,
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

export const onPointClick = (name, center) => {
	return {
		type: ON_POINT_CLICK,
		payload: {
			name,
			center,
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

// export const setRegionsData = (addresses) => {
// 	return {
// 		type: GET_REGIONS_DATA,
// 		payload: {
// 			addresses,
// 		},
// 	};
// };
