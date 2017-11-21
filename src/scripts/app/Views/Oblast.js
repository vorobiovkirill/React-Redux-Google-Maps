import React, { Component } from 'react';

import PropTypes from 'prop-types';

const OblastView = ({ onOblastClick, name, children }) => {
	return (
		<li>
			<span
				className="klk regn"
				onClick={onOblastClick}
			>
				{name}
			</span>
			{children}
		</li>
	);
};

export default OblastView;
