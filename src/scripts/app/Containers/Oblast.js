import React, { Component } from 'react';

import CityContainer from '../Containers/City';
import { DEFAULT_LIST_OF_ADDRESSES_FOLDED } from '../Constants/Constants';
import OblastView from '../Views/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onOblastClick } from '../actions/actionsTypes';

class OblastContainer extends Component {

	citiesRender = (cities) => {
		return (
			<ul className="level1">
				{_.map(cities, (city, index) => {
					return (
						<CityContainer
							key={index}
							city={city}
						/>
					);
				})}
			</ul>
		);
	}

	oblastRender = () => {
		const {
			oblast,
		} = this.props;

		return (
			<OblastView
				name={oblast.name}
				onOblastClick={() => this.props.onOblastClick(oblast.name)}
			>
				{this.props.oblastFolded[oblast.name] && this.citiesRender(oblast.cities)}
			</OblastView>
		);
	}

	render() {
		return this.oblastRender();
	}
}

function mapStateToProps(state) {
	return {
		oblastFolded: state.MainReducer.oblastFolded,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onOblastClick,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OblastContainer);
