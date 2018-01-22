import React, { Component } from 'react';
import {
	getCitiesData,
	onOblastClick,
} from '../actions/actionsTypes';

import API from '../api';
import CityContainer from '../containers/City';
import OblastView from '../views/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class OblastContainer extends Component {

	citiesRender = (cities) => {
		const {
			oblast,
		} = this.props;

		if (_.isEmpty(cities)) {
			API.fetchCitiesByRegions(oblast.region_id)
				.then(cities => this.props.getCitiesData(cities, oblast.region_id));

			return <i className="fa fa-spinner fa-spin" />;
		}

		return (
			<ul className="level1">
				{_.map(cities, (city) => {
					return (
						<CityContainer
							key={city.city_id}
							city={city}
							regionId={oblast.region_id}
						/>
					);
				})}
			</ul>
		);
	}

	oblastRender = () => {
		const {
			oblast,
			oblastFolded,
			listOfAddressesFolded,
		} = this.props;

		const isFolded = _.includes(oblastFolded, oblast.region_id);

		return (
			<OblastView
				name={oblast.region_name}
				isOblastFolded={isFolded}
				onOblastClick={() => this.props.onOblastClick(oblast.region_id)}
			>
				{
					!listOfAddressesFolded
						? this.citiesRender(oblast.cities)
						: isFolded
							? this.citiesRender(oblast.cities)
							: null
				}
			</OblastView>
		);
	}

	render() {
		return this.oblastRender();
	}
}

function mapStateToProps(state) {
	return {
		listOfAddressesFolded: state.MainReducer.listOfAddressesFolded,
		oblastFolded: state.MainReducer.oblastFolded,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onOblastClick,
		getCitiesData,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OblastContainer);
