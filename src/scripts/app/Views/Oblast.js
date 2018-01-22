import React, { Component } from 'react';

const OblastView = ({ onOblastClick, name, isOblastFolded, children }) => (
	<li>
		<span
			className={isOblastFolded ? "klk regn opened" : "klk regn"}
			onClick={onOblastClick}
		>
			{name}
		</span>
		{children}
	</li>
);

export default OblastView;
