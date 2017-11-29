import {
	DEFAULT_MAP_CENTER,
	DEFAULT_MAP_ZOOM,
	DEFAULT_MARKER_CLUSTER_GRID_SIZE,
	DEFAULT_MINIMUM_CLUSTER_SIZE,
} from '../constants/Constants';
import {
	GoogleMap,
	InfoWindow,
	Marker,
	withGoogleMap,
	withScriptjs,
} from 'react-google-maps';
import React, { Component } from 'react';
import {
	getAllCashdesks,
	getRegionsData,
	onMapLoaded,
	onMarkerClick,
	onOblastClick,
	onPointClick,
	onZoomChange,
} from '../actions/actionsTypes';

import API from '../API';
import ListOfAddresses from '../components/ListOfAddresses';
import { MapComponent } from '../components/MapComponent';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { regions } from '../../data/address-uk-favoritsport';

class MapContainer extends Component {
	state = {
		intervalId: 0,
	}

	componentWillMount = () => {
		API.fetchAllRegions()
			.then(regions => this.props.getRegionsData(regions));
		API.fetchAllCashdesks()
			.then(coordinates => this.props.getAllCashdesks(coordinates));
	}

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

	render() {
		return (
			<div>
				<span>THE CURRENT MAP ZOOM: {this.props.zoom}</span>
				<MapComponent
					mapLoaded={this.props.onMapLoaded}
					isMarkerShown={this.props.isMarkerShown}
					center={this.props.center}
					zoom={this.props.zoom}
					gridSize={this.props.gridSize}
					minimumClusterSize={this.props.minimumClusterSize}
					coordinates={this.props.coordinates}
					markerFolded={this.props.markerFolded}
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
	coordinates: PropTypes.array.isRequired,
	markerFolded: PropTypes.object,
	gridSize: PropTypes.number.isRequired,
	zoomChanged: PropTypes.func,
	onMarkerClick: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		center: state.MainReducer.center,
		zoom: state.MainReducer.zoom,
		gridSize: state.MainReducer.gridSize,
		minimumClusterSize: state.MainReducer.minimumClusterSize,
		markerFolded: state.MainReducer.markerFolded,
		coordinates: state.MainReducer.coordinates,
		isMarkerShown: state.MainReducer.isMarkerShown,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onZoomChange,
		onMarkerClick,
		getRegionsData,
		getAllCashdesks,
		onMapLoaded,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
