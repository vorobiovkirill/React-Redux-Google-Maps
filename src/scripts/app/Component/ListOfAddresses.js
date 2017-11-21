import React, { Component } from 'react';

import OblastContainer from '../Containers/Oblast';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ListOfAddresses extends Component {

	oblastRender = () => {
		const ListOfAddresses = this.props.addresses;
		return _.map(ListOfAddresses, (oblast, index) => {
			return (
				<OblastContainer
					key={index}
					oblast={oblast}
					onPointClick={this.props.onPointClick}
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
export default ListOfAddresses;
