import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM, DEFAULT_MARKER_CLUSTER_GRID_SIZE } from '../Constants/Constants';
import {
	GoogleMap,
	InfoWindow,
	Marker,
	withGoogleMap,
	withScriptjs,
} from 'react-google-maps';
import React, { Component } from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import { getRegionsData, onMarkerClick, onOblastClick, onPointClick, onZoomChange } from '../actions/actionsTypes';

import ListOfAddresses from '../Component/ListOfAddresses';
import { MapComponent } from '../Component/MapComponent';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { regions } from '../../data/address-uk-favoritsport';

class MapContainer extends Component {
	state = {
		intervalId: 0,
		map: null,
		isMarkerShown: false,
		addresses: [],
	}

	componentWillMount = () => {
		this.delayedShowMarker();

		const newAddresses = this.state.addresses;
		const MapOfAddresses = _.map(regions, (region) => region);
		newAddresses.push(MapOfAddresses);

		const favoritOblast = _.flatMap(regions, 'cities');
		const favoritCity = _.flatMap(favoritOblast, 'addresses');
		const favoritAddressesOfPoints = _.map(favoritCity, 'center');

		this.props.getRegionsData(
			MapOfAddresses,
			favoritCity,
		);
	}

	// onPointClick = (name, center) => {
	// 	const index = _.findIndex(this.state.coordinates, { name });
	// 	this.scrollToTop();
	// 	this.setState({
	// 		markersIndex: {
	// 			[index]: !this.state.markersIndex[index],
	// 		},
	// 		center: {
	// 			lat: center[1],
	// 			lng: center[0],
	// 		},
	// 		zoom: 16,
	// 	});
	// }

	// onMapZoomChanged = (index) => {
	// 	const newZoom = this.state.map.getZoom();
	// 	const markersIndex = this.state.markersIndex;
	// 	this.setState({
	// 		zoom: newZoom,
	// 		markersIndex: {},
	// 	});
	// 	// HACK
	// 	setTimeout(() => {
	// 		this.setState({
	// 			markersIndex,
	// 		});
	// 	}, 300);
	// }

	scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(this.state.intervalId);
		}
		window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
	}

	scrollToTop() {
		let newIntervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
		this.setState({
			intervalId: newIntervalId,
		});
	}

	handleMarkerClick = () => {
		this.setState({
			isMarkerShown: false,
		});
		this.delayedShowMarker();
	}

	delayedShowMarker = () => {
		setTimeout(() => {
			this.setState({
				isMarkerShown: true,
			});
		}, 1000);
	}

	mapLoaded = (map) => {
		if (this.state.map !== null) {
			return;
		}
		this.setState({
			map,
		});
	}

	// infoWindowToggle = ({ center, index }) => {
	// 	this.setState({
	// 		markersIndex: {
	// 			[index]: !this.state.markersIndex[index],
	// 		},
	// 		center: {
	// 			lat: center[1],
	// 			lng: center[0],
	// 		},
	// 		zoom: 16,
	// 	});
	// }

	render() {
		return (
			<div>
				<MapComponent
					isMarkerShown={this.state.isMarkerShown}
					mapLoaded={this.mapLoaded}
					center={this.props.center}
					zoom={this.props.zoom}
					gridSize={this.props.gridSize}
					coordinates={this.props.coordinates}
					markersIndex={this.props.markersIndex}
					onMarkerClick={this.handleMarkerClick}
					zoomChanged={this.props.onZoomChange}
					infoWindowToggle={this.props.onMarkerClick}
				/>
				<ListOfAddresses
					addresses={this.props.addresses}
					onPointClick={this.props.onPointClick}
					onOblastClick={this.props.onOblastClick}
				/>
			</div>
		);
	}
}

MapContainer.PropTypes = {
	center: PropTypes.any,
	zoom: PropTypes.number,
	intervalId: PropTypes.number,
	map: PropTypes.any,
	isMarkerShown: PropTypes.array,
	addresses: PropTypes.array,
	coordinates: PropTypes.array,
	markersIndex: PropTypes.object,
	gridSize: PropTypes.number,
	data: PropTypes.array,
	onPointClick: PropTypes.func,
	onMarkerClick: PropTypes.func,
	zoomChanged: PropTypes.func,
	infoWindowToggle: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		center: state.MainReducer.center,
		zoom: state.MainReducer.zoom,
		gridSize: state.MainReducer.gridSize,
		markersIndex: state.MainReducer.markersIndex,
		addresses: state.MainReducer.addresses,
		coordinates: state.MainReducer.coordinates,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onZoomChange,
		onMarkerClick,
		onPointClick,
		onOblastClick,
		getRegionsData,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
