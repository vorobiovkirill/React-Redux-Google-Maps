import {
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_CLUSTER_GRID_SIZE,
} from '../Constants/Constants';
import {
	GoogleMap,
	InfoWindow,
	Marker,
	withGoogleMap,
	withScriptjs,
} from 'react-google-maps';
import React, { Component } from 'react';
import {
	compose,
	withProps,
	withStateHandlers,
} from 'recompose';
import {
	getRegionsData,
	onMapLoaded,
	onMarkerClick,
	onOblastClick,
	onPointClick,
	onZoomChange,
} from '../actions/actionsTypes';

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
	}

	componentWillMount = () => {
		const newAddresses = this.props.addresses;
		const MapOfAddresses = _.map(regions, (region) => region);
		newAddresses.push(MapOfAddresses);

		const favoritOblast = _.flatMap(regions, 'cities');
		const favoritCity = _.flatMap(favoritOblast, 'addresses');
		const favoritAddressesOfPoints = _.map(favoritCity, 'center');

		this.props.getRegionsData(MapOfAddresses, favoritCity);
	}

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

	mapLoaded = (map) => {
		console.log('MAP LOADED');
		if (this.state.map !== null) {
			return;
		}
		this.setState({
			map,
		});
	}

	render() {
		return (
			<div>
				{this.props.zoom}
				<MapComponent
					mapLoaded={this.props.onMapLoaded}
					isMarkerShown={this.props.isMarkerShown}
					center={this.props.center}
					zoom={this.props.zoom}
					gridSize={this.props.gridSize}
					coordinates={this.props.coordinates}
					markersIndex={this.props.markersIndex}
					zoomChanged={this.props.onZoomChange}
					onMarkerClick={this.props.onMarkerClick}
				/>
				<ListOfAddresses />
			</div>
		);
	}
}

MapContainer.PropTypes = {
	center: PropTypes.objectOf({
		lat: PropTypes.number.isRequired,
		lng: PropTypes.number.isRequired,
	}).isRequired,
	zoom: PropTypes.number,
	intervalId: PropTypes.number,
	isMarkerShown: PropTypes.bool,
	addresses: PropTypes.array.isRequired,
	coordinates: PropTypes.array.isRequired,
	markersIndex: PropTypes.object,
	gridSize: PropTypes.number.isRequired,
	zoomChanged: PropTypes.func,
	onMarkerClick: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		center: state.MainReducer.center,
		zoom: state.MainReducer.zoom,
		gridSize: state.MainReducer.gridSize,
		markersIndex: state.MainReducer.markersIndex,
		coordinates: state.MainReducer.coordinates,
		addresses: state.MainReducer.addresses,
		isMarkerShown: state.MainReducer.isMarkerShown,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onZoomChange,
		onMarkerClick,
		getRegionsData,
		onMapLoaded,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
