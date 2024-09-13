import React, { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends PropsWithChildren {
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
