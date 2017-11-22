import React, { Component } from 'react';

import PropTypes from 'prop-types';

const AddressView = ({ onAddressClick, name }) => {
	return (
		<li>
			<a onClick={onAddressClick}>
				{name}
			</a>
		</li>
	);
};

export default AddressView;
