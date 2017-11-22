import React, { Component } from 'react';

import OblastContainer from '../Containers/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onOblastClick } from '../actions/actionsTypes';

class ListOfAddresses extends Component {

	oblastRender = () => {
		const ListOfAddresses = this.props.addresses;
		return _.map(ListOfAddresses, (oblast, index) => {
			return (
				<OblastContainer
					key={index}
					oblast={oblast}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<ul className="menu">
					{this.oblastRender()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		addresses: state.MainReducer.addresses,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onOblastClick,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfAddresses);
