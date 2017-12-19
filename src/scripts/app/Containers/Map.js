import React, { Component, Fragment } from 'react';
import {
	getAllCashdesks,
	getRegionsData,
	onMapLoaded,
	onMarkerClick,
	onOblastClick,
	onPointClick,
	onZoomChange,
} from '../actions/actionsTypes';

import API from '../api';
import ListOfAddresses from '../components/ListOfAddresses';
import { MapComponent } from '../components/MapComponent';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MapContainer extends Component {

	componentWillMount = () => {
		API.fetchAllRegions()
			.then(regions => this.props.getRegionsData(regions));
		API.fetchAllCashdesks()
			.then(coordinates => this.props.getAllCashdesks(coordinates));
	}

	render() {
		return (
			<Fragment>
				<MapComponent
					mapLoaded={this.props.onMapLoaded}
					isMarkerShown={this.props.isMarkerShown}
					center={this.props.center}
					zoom={this.props.zoom}
					coordinates={this.props.coordinates}
					markerFolded={this.props.markerFolded}
					zoomChanged={this.props.onZoomChange}
					onMarkerClick={this.props.onMarkerClick}
				/>
				<ListOfAddresses />
			</Fragment>
		);
	}
}

MapContainer.propTypes = {
	center: PropTypes.shape({
		lat: PropTypes.number.isRequired,
		lng: PropTypes.number.isRequired,
	}).isRequired,
	zoom: PropTypes.number,
	isMarkerShown: PropTypes.bool,
	coordinates: PropTypes.array.isRequired,
	markerFolded: PropTypes.object,
	zoomChanged: PropTypes.func,
	onMarkerClick: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		center: state.MainReducer.center,
		zoom: state.MainReducer.zoom,
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
