import React, { Component } from 'react';

const CityView = ({ onCityClick, name, isCityFolded, children }) => {
	return <li>
			<span
				className={isCityFolded ? 'klk city opened' : 'klk city'}
				onClick={onCityClick}
			>
				{name}
			</span>
			{children}
		</li>;
};

export default CityView;
