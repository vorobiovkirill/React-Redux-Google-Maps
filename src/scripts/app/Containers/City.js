import React, { Component } from 'react';
import {
	getCashdesksData,
	onAddressClick,
	onCityClick,
} from '../actions/actionsTypes';

import API from '../api';
import AddressView from '../views/Address';
import CityView from '../views/City';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CityContainer extends Component {

	state = {
		fetchCashDesksByCity: true,
		selected: false,
	}

	componentWillReceiveProps(nextProps) {
		if (!_.includes(nextProps.cityFolded, nextProps.city.city_id)) {
			this.setState({
				fetchCashDesksByCity: true,
			});
		}
	}

	isActive() {
		return this.state.selected ? 'active' : 'default';
	}

	pointsRender = (cashdesks) => {
		if (this.state.fetchCashDesksByCity) {
			const {
				regionId,
				city,
			} = this.props;

			API.fetchCashDesksByCity(city.city_id)
				.then(cashdesks => {
					this.setState({
						fetchCashDesksByCity: false,
					});
					this.props.getCashdesksData(city, regionId, city.city_id, cashdesks);
				});

			return <i className="fa fa-spinner fa-spin" />;
		}

		return (
			_.isEmpty(cashdesks)
				? <span className="empty" />
				: <ul className="level2">
					{_.map(cashdesks, (cashdesk) => {
						const {
							latitude,
							longitude,
						} = cashdesk;

						const isSelected = _.has(this.props.selectedMarker, cashdesk.cashdesk_id);

						return (
							<AddressView
								key={cashdesk.cashdesk_id}
								id={cashdesk.cashdesk_id}
								name={cashdesk.address}
								isSelected={isSelected}
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
			listOfAddressesFolded,
		} = this.props;

		const isFolded = _.includes(cityFolded, city.city_id);

		return (
			<CityView
				name={city.city_name}
				isCityFolded={isFolded}
				onCityClick={() => this.props.onCityClick(regionId, city.city_id)}
			>
				{
					!listOfAddressesFolded
						? this.pointsRender(city.cashdesks)
						: isFolded
							? this.pointsRender(city.cashdesks)
							: null
				}
			</CityView>
		);
	}
}

function mapStateToProps(state) {
	return {
		listOfAddressesFolded: state.MainReducer.listOfAddressesFolded,
		cityFolded: state.MainReducer.cityFolded,
		selectedMarker: state.MainReducer.selectedMarker,
		cashdeskActive: state.MainReducer.cashdeskActive,
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
