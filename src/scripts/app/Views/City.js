import React, { Component } from 'react';

import PropTypes from 'prop-types';

const CityView = ({ onCityClick, name, children }) => {
	return (
		<li>
			<span
				className="klk city"
				onClick={onCityClick}
			>
				{name}
			</span>
			{children}
		</li>
	);
};

export default CityView;
