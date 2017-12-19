import React, { Component } from 'react';

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
