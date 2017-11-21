import React, { Component } from 'react';

import PropTypes from 'prop-types';

const PointView = ({ onPointClick, name }) => {
	return (
		<li>
			<a
				onClick={onPointClick}
			>
				{name}
			</a>
		</li>
	);
};

export default PointView;
