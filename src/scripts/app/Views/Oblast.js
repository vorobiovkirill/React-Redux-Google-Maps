import React, { Component } from 'react';

const OblastView = ({ onOblastClick, name, children }) => (
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

export default OblastView;
