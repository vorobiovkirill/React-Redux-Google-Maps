import React, { Component } from 'react';
import {
	getCashdesksData,
	onAddressClick,
	onCityClick,
} from '../actions/actionsTypes';

import API from '../API';
import AddressView from '../views/Address';
import CityView from '../views/City';
import { DEFAULT_LIST_OF_ADDRESSES_FOLDED } from '../constants/Constants';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CityContainer extends Component {

	pointsRender = (cashdesks) => {
		if (_.isEmpty(cashdesks)) {
			const {
				regionId,
				city,
			} = this.props;

			API.fetchCashDesksByCity(city.city_id)
				.then(cashdesks => this.props.getCashdesksData(city, regionId, city.city_id, cashdesks));

			return null;
		}
		return (
			<ul className="level2">
				{_.map(cashdesks, (cashdesk) => {
					const {
						latitude,
						longitude,
					} = cashdesk;
					return (
						<AddressView
							key={cashdesk.cashdesk_id}
							name={cashdesk.address}
							onAddressClick={() => this.props.onAddressClick(cashdesk.cashdesk_id, [+latitude, +longitude])}
						/>
					);
				})}
			</ul>
		);
	}

	render() {
		const {
			city,
			regionId,
			cityFolded,
		} = this.props;

		const isFolded = _.includes(cityFolded, city.city_id);

		return (
			<CityView
				name={city.city_name}
				onCityClick={() => this.props.onCityClick(regionId, city.city_id)}
			>
				{isFolded && this.pointsRender(city.cashdesks)}
			</CityView>
		);
	}
}

function mapStateToProps(state) {
	return {
		cityFolded: state.MainReducer.cityFolded,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onCityClick,
		onAddressClick,
		getCashdesksData,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
