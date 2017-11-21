import React, { Component } from 'react';

import CityView from '../Views/City';
import { DEFAULT_LIST_OF_ADDRESSES_FOLDED } from '../Constants/Constants';
import PointView from '../Views/Point';
import PropTypes from 'prop-types';
import _ from 'lodash';

class CityContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			folded: DEFAULT_LIST_OF_ADDRESSES_FOLDED,
		};
	}

	onCityClick = () => {
		this.setState({
			folded: !this.state.folded,
		});
	}

	pointsRender = (addresses, onPointClick) => {
		return (
			<ul className="level2">
				{_.map(addresses, (address, index) => {
					return (
						<PointView
							key={index}
							name={address.name}
							onPointClick={() => onPointClick(address.name, address.center)}
						/>
					);
				})}
			</ul>
		);
	}

	render() {
		const {
			city,
			onPointClick,
		} = this.props;

		return (
			<CityView
				name={city.name}
				onCityClick={() => this.onCityClick()}
			>
				{!this.state.folded && this.pointsRender(city.addresses, onPointClick)}
			</CityView>
		);
	}
}
export default CityContainer;
