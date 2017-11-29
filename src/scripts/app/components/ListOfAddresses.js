import React, { Component } from 'react';

import API from '../API';
import OblastContainer from '../containers/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onOblastClick } from '../actions/actionsTypes';

class ListOfAddresses extends Component {

	oblastRender = () => {
		const ListOfAddresses = this.props.regions;
		return _.map(ListOfAddresses, (oblast) => {
			return (
				<OblastContainer
					key={oblast.region_id}
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
		regions: state.MainReducer.regions,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		onOblastClick,
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfAddresses);
