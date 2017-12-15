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
	withState,
	withStateHandlers,
} from 'recompose';

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
	withScriptjs,
	withGoogleMap,
)((props) => {
	return (
		<GoogleMap
			ref={props.mapLoaded}
			zoom={props.zoom}
			center={props.center}
			onZoomChanged={props.zoomChanged}
		>
			{props.isMarkerShown && props.coordinates.map((cashdesk) => {
				const {
					cashdesk_id: id,
					address,
					latitude,
					longitude,
				} = cashdesk;

				const infoWindowToggle = () => props.onMarkerClick(id, [+latitude, +longitude]);

				return (
					<Marker
						key={id}
						position={{
							lat: +latitude,
							lng: +longitude,
						}}
						defaultTitle={address}
						onClick={infoWindowToggle}
					>
						{props.markerFolded[id] && (
							<InfoWindow
								onCloseClick={infoWindowToggle}
								position={{ lat: +latitude, lng: +longitude }}
							>
								<div>
									{id &&
										<div>
											<img
												src={`/static/media/themes/maps/img/${id}.jpg`}
												alt={address}
											/>
										</div>
									}
									<span>{address}</span>
								</div>
							</InfoWindow>
						)}
					</Marker>
				);
			})}
		</GoogleMap>
	);
});
