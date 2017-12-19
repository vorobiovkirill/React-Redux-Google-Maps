import React, { Component } from 'react';

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
