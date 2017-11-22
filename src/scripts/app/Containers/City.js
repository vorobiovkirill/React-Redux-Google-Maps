import React, { Component } from 'react';
import { onAddressClick, onCityClick } from '../actions/actionsTypes';

import AddressView from '../Views/Address';
import CityView from '../Views/City';
import { DEFAULT_LIST_OF_ADDRESSES_FOLDED } from '../Constants/Constants';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CityContainer extends Component {

	pointsRender = (addresses) => {
		return (
			<ul className="level2">
				{_.map(addresses, (address, index) => {
					return (
						<AddressView
							key={index}
							name={address.name}
							onAddressClick={() => this.props.onAddressClick(address.name, address.center)}
						/>
					);
				})}
			</ul>
		);
	}

	render() {
		const {
			city,
		} = this.props;

		return (
			<CityView
				name={city.name}
				onCityClick={() => this.props.onCityClick(city.name)}
			>
				{this.props.cityFolded[city.name] && this.pointsRender(city.addresses)}
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
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CityContainer);
