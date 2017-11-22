import {
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	MAP_ZOOM_AFTER_MARKER_CLICK,
} from '../Constants/Constants';
import {
	GET_REGIONS_DATA,
	ON_ADDRESS_CLICK,
	ON_CITY_CLICK,
	ON_MAP_LOADED,
	ON_MARKER_CLICK,
	ON_OBLAST_CLICK,
	ON_ZOOM_CHANGED,
} from '../Constants';

import _ from 'lodash';

const initialState = {
	intervalId: 0,
	map: null,
	isMarkerShown: true,
	addresses: [],
	coordinates: [],
	markersIndex: {},
	center: {
		lat: DEFAULT_MAP_CENTER[1],
		lng: DEFAULT_MAP_CENTER[0],
	},
	zoom: DEFAULT_MAP_ZOOM,
	gridSize: DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	oblastFolded: {},
	cityFolded: {},
};

const MainReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REGIONS_DATA: {
			return {
				...state,
				addresses: action.payload.addresses,
				coordinates: action.payload.coordinates,
			};
		}
		case ON_MARKER_CLICK: {
			return {
				...state,
				markersIndex: {
					[action.payload.index]: !state.markersIndex[action.payload.index],
				},
				center: {
					lat: action.payload.center[1],
					lng: action.payload.center[0],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case ON_OBLAST_CLICK: {
			return {
				...state,
				oblastFolded: {
					[action.payload.name]: !state.oblastFolded[action.payload.name],
				},
			};
		}
		case ON_CITY_CLICK: {
			return {
				...state,
				cityFolded: {
					[action.payload.name]: !state.cityFolded[action.payload.name],
				},
			};
		}
		case ON_ADDRESS_CLICK: {
			const index = _.findIndex(state.coordinates, { name: action.payload.name });
			return {
				...state,
				markersIndex: {
					[index]: !state.markersIndex[index],
				},
				center: {
					lat: action.payload.center[1],
					lng: action.payload.center[0],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case ON_MAP_LOADED: {
			return {
				...state,
				map: action.payload.map,
			};
		}
		// case ON_ZOOM_CHANGED: {
		// 	return {
		// 		...state,
		// 		zoom: action.payload.zoom,
		// 	};
		// }
		default:
			return state;
	}
};

export default MainReducer;
