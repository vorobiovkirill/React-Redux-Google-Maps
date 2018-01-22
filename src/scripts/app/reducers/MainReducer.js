import * as actionTypes from '../constants';

import {
	DEFAULT_LIST_OF_ADDRESSES_FOLDED,
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	DEFAULT_MINIMUM_CLUSTER_SIZE,
	MAP_ZOOM_AFTER_MARKER_CLICK,
} from '../constants/Constants';

import _ from 'lodash';

const initialState = {
	intervalId: 0,
	map: null,
	isMarkerShown: true,
	center: {
		lat: DEFAULT_MAP_CENTER[0],
		lng: DEFAULT_MAP_CENTER[1],
	},
	zoom: DEFAULT_MAP_ZOOM,
	gridSize: DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	minimumGridSize: DEFAULT_MINIMUM_CLUSTER_SIZE,
	regions: [],
	coordinates: [],
	selectedMarker: {},
	listOfAddressesFolded: DEFAULT_LIST_OF_ADDRESSES_FOLDED,
	oblastFolded: [],
	cityFolded: [],
};

const MainReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ON_MAP_LOADED: {
			return {
				...state,
				map: action.payload.map,
			};
		}
		case actionTypes.GET_ALL_CASHDESKS: {
			const { coordinates } = action.payload;
			const filteredCoordinates = _.filter(coordinates, (coordinate) =>
				!_.isNil(coordinate.latitude) && !_.isNil(coordinate.longitude));

			return {
				...state,
				coordinates: filteredCoordinates,
			};
		}
		case actionTypes.GET_REGIONS_DATA: {
			const { regions } = action.payload;

			const SortedRegions = _.orderBy(regions, [region => region.region_name.localeCompare()], ['asc']);

			return {
				...state,
				regions: SortedRegions,
			};
		}
		case actionTypes.GET_CITIES_DATA: {
			const { regions } = state;
			const { regionId, cities } = action.payload;

			const SortedCities = _.orderBy(cities, [city => city.city_name.localeCompare()], ['asc']);

			const UpdatedRegions = _.map(regions, (region) => region.region_id === regionId
				? { ...region, cities: SortedCities }
				: region);

			return {
				...state,
				regions: UpdatedRegions,
			};
		}
		case actionTypes.GET_CASHDESKS_DATA: {
			const { regions } = state;
			const { regionId, cityId, cashdesks } = action.payload;

			const SortedCashdesks = _.orderBy(cashdesks, [address => address.address.localeCompare()], ['asc']);

			const UpdatedRegions = _.map(regions, (region) => {
				if (region.region_id === regionId) {
					return {
						...region,
						cities: _.map(region.cities, (city) => {
							if (city.city_id === cityId) {
								return {
									...city,
									cashdesks: SortedCashdesks,
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
				regions: UpdatedRegions,
			};
		}
		case actionTypes.ON_OBLAST_CLICK: {
			const validRegion = _.includes(state.oblastFolded, action.payload.regionId);
			const newFoldedRegions = validRegion
				? _.without(state.oblastFolded, action.payload.regionId)
				: _.concat(state.oblastFolded, action.payload.regionId);

			return {
				...state,
				oblastFolded: newFoldedRegions,
			};
		}
		case actionTypes.ON_CITY_CLICK: {
			const validCity = _.includes(state.cityFolded, action.payload.cityId);
			const newFoldedCities = validCity
				? _.without(state.cityFolded, action.payload.cityId)
				: _.concat(state.cityFolded, action.payload.cityId);

			return {
				...state,
				cityFolded: newFoldedCities,
			};
		}
		case actionTypes.ON_ADDRESS_CLICK: {
			const { cashdeskId } = action.payload;
			const pageYOffset = window.scroll(0, window.pageYOffset - 10000);

			if (window.pageYOffset === 0) {
				clearInterval(state.intervalId);
			}

			let newIntervalId = setInterval(pageYOffset, 16.66);

			return {
				...state,
				intervalId: newIntervalId,
				selectedMarker: {
					[cashdeskId]: !state.selectedMarker[cashdeskId],
				},
				center: {
					lat: action.payload.center[0],
					lng: action.payload.center[1],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case actionTypes.ON_MARKER_CLICK: {
			const { cashdeskId } = action.payload;

			return {
				...state,
				selectedMarker: {
					[cashdeskId]: !state.selectedMarker[cashdeskId],
				},
				center: {
					lat: action.payload.center[0],
					lng: action.payload.center[1],
				},
				zoom: MAP_ZOOM_AFTER_MARKER_CLICK,
			};
		}
		case actionTypes.ON_ZOOM_CHANGED: {
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
