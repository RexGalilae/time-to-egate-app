import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import './TransitionWrapper.scss';

const TransitionWrapper: React.FC<{
	className?: string;
	children: React.ReactNode;
}> = ({ className = 'fade', children }) => {
	const location = useLocation();

	return (
		<TransitionGroup>
			<CSSTransition
				key={location.key}
				classNames={className}
				timeout={300}
			>
				{children}
			</CSSTransition>
		</TransitionGroup>
	);
};

export default TransitionWrapper;
