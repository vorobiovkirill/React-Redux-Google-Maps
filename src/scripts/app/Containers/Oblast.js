import React, { Component } from 'react';

import CityContainer from '../Containers/City';
import { DEFAULT_LIST_OF_ADDRESSES_FOLDED } from '../Constants/Constants';
import OblastView from '../Views/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';

class OblastContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			folded: DEFAULT_LIST_OF_ADDRESSES_FOLDED,
		};
	}

	onOblastClick = () => {
		this.setState({
			folded: !this.state.folded,
		});
	}

	citiesRender = (cities, onPointClick) => {
		return (
			<ul className="level1">
				{_.map(cities, (city, index) => {
					return (
						<CityContainer
							key={index}
							city={city}
							onPointClick={onPointClick}
						/>
					);
				})}
			</ul>
		);
	}

	oblastRender = () => {
		const {
			oblast,
			onPointClick,
		} = this.props;

		return (
			<OblastView
				onOblastClick={() => this.onOblastClick()}
				name={oblast.name}
			>
				{!this.state.folded && this.citiesRender(oblast.cities, onPointClick)}
			</OblastView>
		);
	}

	render() {
		return this.oblastRender();
	}
}
export default OblastContainer;
