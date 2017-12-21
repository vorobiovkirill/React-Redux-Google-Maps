import React, { Component } from 'react';

import OblastContainer from '../containers/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
			<ul className="menu">
				{this.oblastRender()}
			</ul>
		);
	}
}

function mapStateToProps(state) {
	return {
		regions: state.MainReducer.regions,
	};
}

export default connect(mapStateToProps)(ListOfAddresses);
