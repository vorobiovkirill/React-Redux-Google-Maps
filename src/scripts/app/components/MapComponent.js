import {
	GoogleMap,
	InfoWindow,
	Marker,
	withGoogleMap,
	withScriptjs,
} from 'react-google-maps';
import React, { Component } from 'react';
import { compose, withHandlers, withProps, withState, withStateHandlers } from 'recompose';

import { GOOGLE_API_KEY } from '../constants/Constants';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import PropTypes from 'prop-types';
import _ from 'lodash';

export const MapComponent = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: '100%' }} />,
		containerElement: <div style={{ height: '400px' }} />,
		mapElement: <div style={{ height: '100%' }} />,
	}),
	withHandlers({
		onMarkerClustererClick: () => (markerClusterer) => {
			const clickedMarkers = markerClusterer.getMarkers();
		},
	}),
	withScriptjs,
	withGoogleMap,
)(props => {
	return (
		<GoogleMap
			ref={props.mapLoaded}
			zoom={props.zoom}
			center={props.center}
			onZoomChanged={props.zoomChanged}
		>
			<MarkerClusterer
				onClick={props.onMarkerClustererClick}
				averageCenter
				enableRetinaIcons
				gridSize={props.gridSize}
				minimumClusterSize={props.minimumClusterSize}
			>
				{props.isMarkerShown && props.coordinates.map((cashdesk) => {
					const {
						latitude,
						longitude,
					} = cashdesk;
					const infoWindowToggle = () => props.onMarkerClick(cashdesk.cashdesk_id, [+latitude, +longitude]);

					return (
						<Marker
							key={cashdesk.cashdesk_id}
							position={{
								lat: +cashdesk.latitude,
								lng: +cashdesk.longitude,
							}}
							defaultTitle={cashdesk.address}
							onClick={infoWindowToggle}
						>
							{props.markerFolded[cashdesk.cashdesk_id] && (
								<InfoWindow
									onCloseClick={infoWindowToggle}
									position={{ lat: +cashdesk.latitude, lng: +cashdesk.longitude }}
								>
									<div>
										{cashdesk.cashdesk_id &&
											<div>
												<img
													src={`/static/media/themes/maps/img/${cashdesk.cashdesk_id}.jpg`}
													alt={cashdesk.address}
												/>
											</div>
										}
										<span>{cashdesk.address}</span>
									</div>
								</InfoWindow>
							)}
						</Marker>
					);
				})}
			</MarkerClusterer>
		</GoogleMap>
	);
});
