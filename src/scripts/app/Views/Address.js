import React, { Component } from 'react';

import _ from 'lodash';

const AddressView = ({ onAddressClick, name, isSelected, id }) => {
	return (
		<li>
			<a
				className={isSelected ? 'isActive' : ''}
				onClick={onAddressClick}>
				{name}
			</a>
		</li>
	);
};

export default AddressView;
