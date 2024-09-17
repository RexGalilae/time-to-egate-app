import React from 'react';

import chevronLeft from '../../assets/icons/chevron-back.svg';

import './Header.scss';

interface HeaderProps {
	onBackButtonClicked: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackButtonClicked }) => {
	return (
		<div className="header">
			<button className="backButton" onClick={onBackButtonClicked}>
				<img src={chevronLeft} alt="" className="icon" />
			</button>
			{/* <div className="title">Planner</div> */}
		</div>
	);
};

export const FloatingBackButton: React.FC<HeaderProps> = ({
	onBackButtonClicked,
}) => {
	return (
		<button className="backButton floating" onClick={onBackButtonClicked}>
			<img src={chevronLeft} alt="" className="icon" />
		</button>
	);
};

export default Header;
