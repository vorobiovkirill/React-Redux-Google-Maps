import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, DEFAULT_MARKER_CLUSTER_GRID_SIZE } from '../Constants/Constants';
import { GET_REGIONS_DATA, ON_MARKER_CLICK, ON_OBLAST_CLICK, ON_POINT_CLICK, ON_ZOOM_CHANGED } from '../Constants';

import _ from 'lodash';

const initialState = {
	intervalId: 0,
	map: null,
	isMarkerShown: false,
	addresses: [],
	coordinates: [],
	markersIndex: {},
	center: {
		lat: DEFAULT_MAP_CENTER[1],
		lng: DEFAULT_MAP_CENTER[0],
	},
	zoom: DEFAULT_MAP_ZOOM,
	gridSize: DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	// oblastFolded: true,
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
				zoom: 16,
			};
		}
		case ON_POINT_CLICK: {
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
				zoom: 16,
			};
		}
		case ON_OBLAST_CLICK: {
			return {
				...state,
				oblastFolded: !action.payload.oblastFolded,
			};
		}
		default:
			return state;
	}
};

export default MainReducer;
