import {
	DEFAULT_LIST_OF_ADDRESSES_FOLDED,
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	DEFAULT_MINIMUM_CLUSTER_SIZE,
	MAP_ZOOM_AFTER_MARKER_CLICK,
} from '../constants/Constants';
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

import ListOfAddresses from '../components/ListOfAddresses';
import _ from 'lodash';

const initialState = {
	intervalId: 0,
	map: null,
	isMarkerShown: true,
	regions: [],
	coordinates: [],
	markerFolded: {},
	center: {
		lat: DEFAULT_MAP_CENTER[0],
		lng: DEFAULT_MAP_CENTER[1],
	},
	zoom: DEFAULT_MAP_ZOOM,
	gridSize: DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	minimumGridSize: DEFAULT_MINIMUM_CLUSTER_SIZE,
	listOfAddressesFolded: DEFAULT_LIST_OF_ADDRESSES_FOLDED,
	oblastFolded: [],
	cityFolded: [],
};

const MainReducer = (state = initialState, action) => {
	switch (action.type) {
		case ON_MAP_LOADED: {
			return {
				...state,
				map: action.payload.map,
			};
		}
		case GET_REGIONS_DATA: {
			return {
				...state,
				regions: action.payload.regions,
			};
		}
		case GET_ALL_CASHDESKS: {
			const filteredCoordinates = _.filter(action.payload.coordinates, (coordinate) =>
				!_.isNil(coordinate.latitude) && !_.isNil(coordinate.longitude),
			);

			return {
				...state,
				coordinates: filteredCoordinates,
			};
		}
		case GET_CITIES_DATA: {
			const regionId = action.payload.regionId;
			const cities = action.payload.cities;
			const regions = state.regions;

			const newRegions = _.map(regions, (region) => region.region_id === regionId
				? { ...region, cities }
				: region,
			);

			return {
				...state,
				regions: newRegions,
			};
		}
		case GET_CASHDESKS_DATA: {
			const newCities = action.payload.city;
			const cityId = action.payload.cityId;
			const regionId = action.payload.regionId;
			const cashdesks = action.payload.cashdesks;

			const regions = state.regions;

			const newRegions = _.map(regions, (region) => {
				if (region.region_id === regionId) {
					return {
						...region,
						cities: _.map(region.cities, (city) => {
							if (city.city_id === cityId) {
								return {
									...city,
									cashdesks,
								};
							}
							return city;
						}),
					};
				}
				return region;
			});

			return {
				...state,
				regions: newRegions,
			};
		}
		case ON_OBLAST_CLICK: {
			const validRegion = _.includes(state.oblastFolded, action.payload.regionId);
			const newFoldedRegions = validRegion
				? _.without(state.oblastFolded, action.payload.regionId)
				: _.concat(state.oblastFolded, action.payload.regionId);

			return {
				...state,
				listOfAddressesFolded: !state.listOfAddressesFolded,
				oblastFolded: newFoldedRegions,
			};
		}
		case ON_CITY_CLICK: {
			const validCity = _.includes(state.cityFolded, action.payload.cityId);
			const newFoldedCities = validCity
				? _.without(state.cityFolded, action.payload.cityId)
				: _.concat(state.cityFolded, action.payload.cityId);

			return {
				...state,
				cityFolded: newFoldedCities,
			};
		}
		case ON_ADDRESS_CLICK: {
			const cashdeskId = action.payload.cashdeskId;

			return {
				...state,
				// intervalId: newIntervalId,
				markerFolded: {
					[cashdeskId]: !state.markerFolded[cashdeskId],
				},
				center: {
					lat: action.payload.center[0],
					lng: action.payload.center[1],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case ON_MARKER_CLICK: {
			const cashdeskId = action.payload.cashdeskId;

			return {
				...state,
				markerFolded: {
					[cashdeskId]: !state.markerFolded[cashdeskId],
				},
				center: {
					lat: action.payload.center[0],
					lng: action.payload.center[1],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case ON_ZOOM_CHANGED: {
			const newZoom = state.map.getZoom();
			return {
				...state,
				zoom: newZoom,
			};
		}
		default:
			return state;
	}
};

export default MainReducer;
